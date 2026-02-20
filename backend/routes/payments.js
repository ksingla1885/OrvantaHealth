const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');

// Initialize Razorpay
let razorpay;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
}

// Create Razorpay order for appointment payment
router.post('/create-order', [
  body('appointmentId').isMongoId()
], authenticateToken, authorizeRoles('patient'), async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(503).json({
        success: false,
        message: 'Payment service is not configured. Please contact administrator.'
      });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { appointmentId } = req.body;

    // Get patient profile
    const patient = await Patient.findOne({ userId: req.user._id });
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found'
      });
    }

    // Get appointment
    const appointment = await Appointment.findById(appointmentId)
      .populate('doctorId');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check if appointment belongs to this patient
    if (appointment.patientId.toString() !== patient._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check if payment is already done
    if (appointment.paymentStatus === 'paid') {
      return res.status(400).json({
        success: false,
        message: 'Payment already completed'
      });
    }

    // Get consultation fee
    const amount = appointment.doctorId.consultationFee * 100; // Convert to paise

    // Create Razorpay order
    const options = {
      amount: amount,
      currency: 'INR',
      receipt: `appointment_${appointmentId}`,
      notes: {
        appointmentId: appointmentId,
        patientId: patient._id,
        doctorId: appointment.doctorId._id
      }
    };

    const order = await razorpay.orders.create(options);

    // Update appointment with order details
    appointment.paymentDetails.orderId = order.id;
    appointment.paymentDetails.amount = amount / 100;
    appointment.paymentDetails.currency = order.currency;
    await appointment.save();

    res.json({
      success: true,
      message: 'Order created successfully',
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating payment order'
    });
  }
});

// Verify Razorpay payment
router.post('/verify', [
  body('razorpay_order_id').notEmpty(),
  body('razorpay_payment_id').notEmpty(),
  body('razorpay_signature').notEmpty(),
  body('appointmentId').isMongoId()
], authenticateToken, authorizeRoles('patient'), async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(503).json({
        success: false,
        message: 'Payment service is not configured. Please contact administrator.'
      });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, appointmentId } = req.body;

    // Get patient profile
    const patient = await Patient.findOne({ userId: req.user._id });
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found'
      });
    }

    // Get appointment
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check if appointment belongs to this patient
    if (appointment.patientId.toString() !== patient._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Verify signature
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }

    // Verify payment with Razorpay
    try {
      const payment = await razorpay.payments.fetch(razorpay_payment_id);
      
      if (payment.status !== 'captured') {
        return res.status(400).json({
          success: false,
          message: 'Payment not successful'
        });
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }

    // Update appointment payment status
    appointment.paymentDetails.paymentId = razorpay_payment_id;
    appointment.paymentStatus = 'paid';
    appointment.status = 'confirmed';
    await appointment.save();

    // TODO: Send confirmation email
    // await sendPaymentConfirmationEmail(patient.email, appointment);

    res.json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        paymentId: razorpay_payment_id,
        appointment: appointment
      }
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error verifying payment'
    });
  }
});

// Get payment status
router.get('/status/:appointmentId', authenticateToken, async (req, res) => {
  try {
    const { appointmentId } = req.params;

    let query = { _id: appointmentId };

    // Add role-based filtering
    switch (req.user.role) {
      case 'patient':
        const patient = await Patient.findOne({ userId: req.user._id });
        if (!patient) {
          return res.status(404).json({
            success: false,
            message: 'Patient profile not found'
          });
        }
        query.patientId = patient._id;
        break;
      
      case 'doctor':
        const Doctor = require('../models/Doctor');
        const doctor = await Doctor.findOne({ userId: req.user._id });
        if (!doctor) {
          return res.status(404).json({
            success: false,
            message: 'Doctor profile not found'
          });
        }
        query.doctorId = doctor._id;
        break;
      
      case 'receptionist':
      case 'superadmin':
        // Can access all
        break;
      
      default:
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
    }

    const appointment = await Appointment.findOne(query)
      .select('paymentStatus paymentDetails status');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      data: {
        paymentStatus: appointment.paymentStatus,
        paymentDetails: appointment.paymentDetails,
        appointmentStatus: appointment.status
      }
    });
  } catch (error) {
    console.error('Get payment status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching payment status'
    });
  }
});

// Process refund (admin only)
router.post('/refund', [
  body('appointmentId').isMongoId(),
  body('amount').optional().isNumeric()
], authenticateToken, authorizeRoles('superadmin', 'receptionist'), async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(503).json({
        success: false,
        message: 'Payment service is not configured. Please contact administrator.'
      });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { appointmentId, amount } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    if (appointment.paymentStatus !== 'paid') {
      return res.status(400).json({
        success: false,
        message: 'No payment to refund'
      });
    }

    if (!appointment.paymentDetails.paymentId) {
      return res.status(400).json({
        success: false,
        message: 'Payment ID not found'
      });
    }

    try {
      // Create refund
      const refund = await razorpay.payments.refund(appointment.paymentDetails.paymentId, {
        amount: amount ? amount * 100 : undefined // Convert to paise if amount provided
      });

      // Update appointment
      appointment.paymentStatus = 'refunded';
      await appointment.save();

      res.json({
        success: true,
        message: 'Refund processed successfully',
        data: {
          refundId: refund.id,
          amount: refund.amount / 100
        }
      });
    } catch (refundError) {
      console.error('Refund error:', refundError);
      res.status(500).json({
        success: false,
        message: 'Refund processing failed'
      });
    }
  } catch (error) {
    console.error('Process refund error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error processing refund'
    });
  }
});

module.exports = router;
