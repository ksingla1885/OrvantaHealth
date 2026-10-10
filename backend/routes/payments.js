const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const prisma = require('../prismaClient');
const { sendPaymentConfirmationEmail } = require('../utils/emailService');
const razorpay = require('../utils/razorpay');

// Create Razorpay order for appointment payment
router.post('/create-order', [
  body('appointmentId').isUUID()
], authenticateToken, authorizeRoles('patient'), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Validation errors', errors: errors.array() });
    }

    const { appointmentId } = req.body;
    const userId = req.user.id || req.user._id;

    const patient = await prisma.patient.findUnique({ where: { userId } });
    if (!patient) return res.status(404).json({ success: false, message: 'Patient profile not found' });

    let appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { doctor: true }
    });

    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });
    if (appointment.patientId !== patient.id) return res.status(403).json({ success: false, message: 'Access denied' });
    if (appointment.paymentStatus === 'paid') return res.status(400).json({ success: false, message: 'Payment already completed' });

    const amount = (appointment.doctor.consultationFee || 0) * 100;
    const isMock = !razorpay || process.env.RAZORPAY_KEY_ID === 'rzp_test_1234567890abcdef';

    if (isMock) {
      const mockOrder = { id: `order_mock_${Date.now()}`, amount, currency: 'INR' };
      
      appointment = await prisma.appointment.update({
        where: { id: appointmentId },
        data: {
          paymentDetails: {
            orderId: mockOrder.id,
            amount: amount / 100,
            currency: mockOrder.currency
          }
        }
      });

      return res.json({
        success: true, isMock: true, message: 'Mock order created (Demo Mode)',
        data: { orderId: mockOrder.id, amount: mockOrder.amount, currency: mockOrder.currency, keyId: 'mock_key' }
      });
    }

    const options = {
      amount: amount,
      currency: 'INR',
      receipt: `appointment_${appointmentId}`,
      notes: { appointmentId, patientId: patient.id, doctorId: appointment.doctorId }
    };

    const order = await razorpay.orders.create(options);

    await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        paymentDetails: {
          orderId: order.id,
          amount: amount / 100,
          currency: order.currency
        }
      }
    });

    res.json({
      success: true, message: 'Order created successfully',
      data: { orderId: order.id, amount: order.amount, currency: order.currency, keyId: process.env.RAZORPAY_KEY_ID }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ success: false, message: 'Server error creating payment order' });
  }
});

// Verify Razorpay payment
router.post('/verify', [
  body('razorpay_order_id').notEmpty(),
  body('razorpay_payment_id').notEmpty(),
  body('razorpay_signature').notEmpty(),
  body('appointmentId').isUUID()
], authenticateToken, authorizeRoles('patient'), async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, appointmentId } = req.body;
    const userId = req.user.id || req.user._id;

    const patient = await prisma.patient.findUnique({ where: { userId } });
    if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });

    let appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { doctor: { include: { user: { select: { profile: true } } } } }
    });

    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });
    if (appointment.patientId !== patient.id) return res.status(403).json({ success: false, message: 'Access denied' });

    if (!razorpay_order_id.startsWith('order_mock_')) {
      if (!razorpay) return res.status(503).json({ success: false, message: 'Payment service not configured.' });
      
      const generated_signature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generated_signature !== razorpay_signature) {
        return res.status(400).json({ success: false, message: 'Invalid payment signature' });
      }
    }

    const currentPaymentDetails = appointment.paymentDetails || {};
    
    appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        paymentStatus: 'paid',
        paymentDetails: {
          ...currentPaymentDetails,
          paymentId: razorpay_payment_id
        }
      }
    });

    const bill = await prisma.bill.create({
      data: {
        patientId: appointment.patientId,
        appointmentId: appointment.id,
        items: [{
          description: `Consultation fee for Dr. ${appointment.doctor.user?.profile?.firstName} ${appointment.doctor.user?.profile?.lastName}`,
          quantity: 1,
          unitPrice: currentPaymentDetails.amount || 0,
          total: currentPaymentDetails.amount || 0
        }],
        subtotal: currentPaymentDetails.amount || 0,
        total: currentPaymentDetails.amount || 0,
        status: 'paid',
        paymentMethod: 'online',
        paymentDetails: {
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          amount: currentPaymentDetails.amount,
          currency: currentPaymentDetails.currency
        },
        createdById: userId
      }
    });

    try {
      const doctorName = `${appointment.doctor.user?.profile?.firstName} ${appointment.doctor.user?.profile?.lastName}`;
      await sendPaymentConfirmationEmail(req.user.email, {
        doctorName,
        date: new Date(appointment.date).toLocaleDateString(),
        time: `${appointment.timeSlot.start} - ${appointment.timeSlot.end}`,
        amount: currentPaymentDetails.amount,
        paymentId: razorpay_payment_id
      });
    } catch (e) {
      console.error('Failed to send email:', e);
    }

    res.json({
      success: true, message: 'Payment verified successfully and bill generated',
      data: { paymentId: razorpay_payment_id, appointment, bill }
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ success: false, message: 'Server error verifying payment' });
  }
});

// Create Razorpay order for bill payment
router.post('/create-bill-order', [
  body('billId').isUUID()
], authenticateToken, authorizeRoles('patient'), async (req, res) => {
  try {
    const { billId } = req.body;
    const userId = req.user.id || req.user._id;

    const patient = await prisma.patient.findUnique({ where: { userId } });
    if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });

    let bill = await prisma.bill.findUnique({ where: { id: billId } });
    if (!bill) return res.status(404).json({ success: false, message: 'Bill not found' });
    if (bill.patientId !== patient.id) return res.status(403).json({ success: false, message: 'Access denied' });
    if (bill.status === 'paid') return res.status(400).json({ success: false, message: 'Bill already paid' });

    const amount = Math.round(bill.total * 100);
    const isMock = !razorpay || process.env.RAZORPAY_KEY_ID === 'rzp_test_1234567890abcdef';

    if (isMock) {
      const mockOrder = { id: `order_mock_${Date.now()}`, amount, currency: 'INR' };
      bill = await prisma.bill.update({
        where: { id: billId },
        data: {
          status: 'pending_payment',
          paymentDetails: { orderId: mockOrder.id, amount: amount / 100, currency: mockOrder.currency }
        }
      });
      return res.json({
        success: true, isMock: true, message: 'Mock order created (Demo Mode)',
        data: { orderId: mockOrder.id, amount: mockOrder.amount, currency: mockOrder.currency, keyId: 'mock_key' }
      });
    }

    const options = {
      amount, currency: 'INR', receipt: `bill_${billId}`,
      notes: { billId, patientId: patient.id }
    };
    const order = await razorpay.orders.create(options);

    await prisma.bill.update({
      where: { id: billId },
      data: {
        status: 'pending_payment',
        paymentDetails: { orderId: order.id, amount: amount / 100, currency: order.currency }
      }
    });

    res.json({
      success: true, message: 'Order created successfully',
      data: { orderId: order.id, amount: order.amount, currency: order.currency, keyId: process.env.RAZORPAY_KEY_ID }
    });
  } catch (error) {
    console.error('Create bill order error:', error);
    res.status(500).json({ success: false, message: 'Server error creating bill payment order' });
  }
});

// Verify Razorpay bill payment
router.post('/verify-bill', [
  body('razorpay_order_id').notEmpty(),
  body('razorpay_payment_id').notEmpty(),
  body('razorpay_signature').notEmpty(),
  body('billId').isUUID()
], authenticateToken, authorizeRoles('patient'), async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, billId } = req.body;
    const userId = req.user.id || req.user._id;

    const patient = await prisma.patient.findUnique({ where: { userId } });
    let bill = await prisma.bill.findUnique({ where: { id: billId } });

    if (!bill || !patient || bill.patientId !== patient.id) {
      return res.status(404).json({ success: false, message: 'Bill not found' });
    }

    if (!razorpay_order_id.startsWith('order_mock_')) {
      if (!razorpay) return res.status(503).json({ success: false, message: 'Payment service not configured.' });
      
      const generated_signature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generated_signature !== razorpay_signature) {
        return res.status(400).json({ success: false, message: 'Invalid signature' });
      }
    }

    const currentDetails = bill.paymentDetails || {};
    bill = await prisma.bill.update({
      where: { id: billId },
      data: {
        status: 'paid',
        paymentMethod: 'online',
        paymentDetails: { ...currentDetails, paymentId: razorpay_payment_id }
      }
    });

    res.json({ success: true, message: 'Payment verified successfully', data: { bill } });
  } catch (error) {
    console.error('Verify bill error:', error);
    res.status(500).json({ success: false, message: 'Verification failed' });
  }
});

// Mark appointment as paid at reception
router.patch('/mark-paid/:appointmentId', authenticateToken, authorizeRoles('receptionist', 'superadmin'), async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const userId = req.user.id || req.user._id;

    let appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { doctor: { include: { user: { select: { profile: true } } } } }
    });

    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });
    if (appointment.paymentStatus === 'paid') return res.status(400).json({ success: false, message: 'Already marked as paid' });

    const collectedAmount = req.body.amount ? parseFloat(req.body.amount) : (appointment.doctor?.consultationFee || 0);

    const currentDetails = appointment.paymentDetails || {};
    appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        paymentStatus: 'paid',
        paymentMode: 'at_reception',
        paymentDetails: { ...currentDetails, amount: collectedAmount, currency: 'INR' }
      }
    });

    const bill = await prisma.bill.create({
      data: {
        patientId: appointment.patientId,
        appointmentId: appointment.id,
        items: [{
          description: `Consultation fee for Dr. ${appointment.doctor?.user?.profile?.firstName} ${appointment.doctor?.user?.profile?.lastName}`,
          quantity: 1, unitPrice: collectedAmount, total: collectedAmount
        }],
        subtotal: collectedAmount,
        total: collectedAmount,
        status: 'paid',
        paymentMethod: 'cash',
        createdById: userId
      }
    });

    res.json({ success: true, message: 'Payment marked as collected at reception', data: { appointment, bill } });
  } catch (error) {
    console.error('Mark paid error:', error);
    res.status(500).json({ success: false, message: 'Server error marking payment' });
  }
});

// Get payment status
router.get('/status/:appointmentId', authenticateToken, async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const userId = req.user.id || req.user._id;

    let query = { id: appointmentId };

    switch (req.user.role) {
      case 'patient':
        const patient = await prisma.patient.findUnique({ where: { userId } });
        if (!patient) return res.status(404).json({ success: false, message: 'Profile not found' });
        query.patientId = patient.id;
        break;
      case 'doctor':
        const doctor = await prisma.doctor.findUnique({ where: { userId } });
        if (!doctor) return res.status(404).json({ success: false, message: 'Profile not found' });
        query.doctorId = doctor.id;
        break;
      case 'receptionist':
      case 'superadmin':
        break;
      default: return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const appointment = await prisma.appointment.findFirst({
      where: query,
      select: { paymentStatus: true, paymentDetails: true, status: true }
    });

    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });

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
    res.status(500).json({ success: false, message: 'Server error fetching payment status' });
  }
});

// Process refund (admin only)
router.post('/refund', [
  body('appointmentId').isUUID(),
  body('amount').optional().isNumeric()
], authenticateToken, authorizeRoles('superadmin', 'receptionist'), async (req, res) => {
  try {
    if (!razorpay) return res.status(503).json({ success: false, message: 'Payment service not configured.' });
    
    const { appointmentId, amount } = req.body;
    let appointment = await prisma.appointment.findUnique({ where: { id: appointmentId } });

    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });
    if (appointment.paymentStatus !== 'paid') return res.status(400).json({ success: false, message: 'No payment to refund' });
    
    const paymentDetails = appointment.paymentDetails || {};
    if (!paymentDetails.paymentId) return res.status(400).json({ success: false, message: 'Payment ID not found' });

    const refund = await razorpay.payments.refund(paymentDetails.paymentId, {
      amount: amount ? amount * 100 : undefined
    });

    appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { paymentStatus: 'refunded' }
    });

    res.json({
      success: true, message: 'Refund processed successfully',
      data: { refundId: refund.id, amount: refund.amount / 100 }
    });
  } catch (error) {
    console.error('Process refund error:', error);
    res.status(500).json({ success: false, message: 'Server error processing refund' });
  }
});

module.exports = router;
