const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const prisma = require('../prismaClient');
const razorpay = require('../utils/razorpay');

// Book appointment (patient only)
router.post('/book', [
  body('doctorId').isUUID(),
  body('date').isISO8601(),
  body('timeSlot.start').notEmpty(),
  body('timeSlot.end').notEmpty(),
  body('symptoms').optional().isString()
], authenticateToken, authorizeRoles('patient'), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { doctorId, date, timeSlot, symptoms, consultationType, patientDocuments, paymentMode } = req.body;
    const userId = req.user.id || req.user._id;

    // Check if doctor exists and is available
    const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
    if (!doctor || !doctor.isAvailable) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found or not available'
      });
    }

    const appointmentDate = new Date(date);
    if (isNaN(appointmentDate.getTime())) {
      return res.status(400).json({ success: false, message: 'Invalid date format' });
    }

    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayOfWeek = dayNames[appointmentDate.getUTCDay()];

    const availability = doctor.availability || {};
    if (!availability.days || !availability.days.includes(dayOfWeek)) {
      return res.status(400).json({
        success: false,
        message: `Doctor is not available on ${dayOfWeek}s. Available days: ${availability.days?.join(', ') || 'None'}`
      });
    }

    let dateString = appointmentDate.toISOString().split('T')[0];
    const leaves = doctor.leaves || [];
    if (leaves.includes(dateString)) {
      return res.status(400).json({ success: false, message: 'Doctor is on leave on this date' });
    }

    const isTimeSlotValid = availability.timeSlots?.some(slot => {
      return timeSlot.start >= slot.start && timeSlot.end <= slot.end;
    }) || false;

    if (!isTimeSlotValid) {
      return res.status(400).json({ success: false, message: 'Time slot not within doctor\'s available hours' });
    }

    // Check double booking
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        date: appointmentDate,
        status: { in: ['pending', 'confirmed', 'checked_in'] }
      }
    });

    const hasDoubleBooking = existingAppointments.some(apt => {
      const aptSlot = apt.timeSlot || {};
      return aptSlot.start === timeSlot.start && aptSlot.end === timeSlot.end;
    });

    if (hasDoubleBooking) {
      return res.status(400).json({ success: false, message: 'This time slot is already booked' });
    }

    // Get patient profile
    const patient = await prisma.patient.findUnique({ where: { userId } });
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient profile not found' });
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        patientId: patient.id,
        doctorId,
        date: appointmentDate,
        timeSlot: timeSlot,
        symptoms: symptoms || null,
        patientDocuments: patientDocuments || [],
        consultationType: consultationType || 'in-person',
        paymentMode: paymentMode || 'at_reception'
      },
      include: {
        doctor: { include: { user: { select: { profile: true } } } },
        patient: { include: { user: { select: { profile: true } } } }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: { appointment }
    });
  } catch (error) {
    console.error('Book appointment error:', error);
    res.status(500).json({ success: false, message: 'Server error booking appointment' });
  }
});

// Get appointments
router.get('/', authenticateToken, async (req, res) => {
  try {
    let whereClause = {};
    const userId = req.user.id || req.user._id;

    switch (req.user.role) {
      case 'patient':
        const patient = await prisma.patient.findUnique({ where: { userId } });
        if (!patient) return res.status(404).json({ success: false, message: 'Patient profile not found' });
        whereClause.patientId = patient.id;
        break;
      case 'doctor':
        const doctor = await prisma.doctor.findUnique({ where: { userId } });
        if (!doctor) return res.status(404).json({ success: false, message: 'Doctor profile not found' });
        whereClause.doctorId = doctor.id;
        whereClause.status = { not: 'pending' };
        break;
      case 'receptionist':
      case 'superadmin':
        break;
      default:
        return res.status(403).json({ success: false, message: 'Access denied' });
    }

    if (req.query.date) {
      const startDate = new Date(req.query.date);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      whereClause.date = { gte: startDate, lt: endDate };
    }

    if (req.query.status) {
      if (req.user.role === 'doctor') {
        const allowedDoctorStatuses = ['confirmed', 'checked_in', 'checked_out', 'completed', 'cancelled'];
        if (allowedDoctorStatuses.includes(req.query.status)) {
          whereClause.status = req.query.status;
        }
      } else {
        whereClause.status = req.query.status;
      }
    }

    const appointments = await prisma.appointment.findMany({
      where: whereClause,
      include: {
        doctor: { include: { user: { select: { profile: true } } } },
        patient: { include: { user: { select: { profile: true } } } },
        prescription: true
      },
      orderBy: [{ date: 'desc' }]
    });

    const formattedAppointments = appointments.map(appt => {
      const doctorObj = appt.doctor ? {
        ...appt.doctor,
        user: appt.doctor.user,
        userId: appt.doctor.user ? { ...appt.doctor.user, id: appt.doctor.userId } : appt.doctor.userId
      } : null;

      const patientObj = appt.patient ? {
        ...appt.patient,
        user: appt.patient.user,
        userId: appt.patient.user ? { ...appt.patient.user, id: appt.patient.userId } : appt.patient.userId
      } : null;

      return {
        ...appt,
        doctor: doctorObj,
        doctorId: doctorObj || appt.doctorId,
        patient: patientObj,
        patientId: patientObj || appt.patientId
      };
    });

    res.json({
      success: true,
      data: { appointments: formattedAppointments }
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching appointments' });
  }
});

// Update appointment status
router.patch('/:appointmentId/status', [
  body('status').isIn(['confirmed', 'pending', 'checked_in', 'checked_out', 'cancelled', 'completed'])
], authenticateToken, authorizeRoles('receptionist', 'doctor', 'superadmin'), async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status, cancellationReason } = req.body;
    const userId = req.user.id || req.user._id;

    let appointment = await prisma.appointment.findUnique({ where: { id: appointmentId } });
    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });

    if (req.user.role === 'doctor') {
      const doctor = await prisma.doctor.findUnique({ where: { userId } });
      if (!doctor || appointment.doctorId !== doctor.id) {
        return res.status(403).json({ success: false, message: 'Can only update your own appointments' });
      }

      const allowedDoctorTransitions = { confirmed: 'checked_in', checked_in: 'checked_out' };
      const expectedNext = allowedDoctorTransitions[appointment.status];
      if (!expectedNext || status !== expectedNext) {
        return res.status(403).json({ success: false, message: `Cannot transition from '${appointment.status}' to '${status}'.` });
      }
    }

    if (req.user.role === 'receptionist' || req.user.role === 'superadmin') {
      const allowedReceptionistTransitions = { pending: ['confirmed', 'cancelled'] };
      const allowed = allowedReceptionistTransitions[appointment.status] || [];
      if (!allowed.includes(status)) {
        return res.status(403).json({ success: false, message: `Cannot transition appointment from '${appointment.status}' to '${status}'.` });
      }

      if (status === 'confirmed' && appointment.paymentMode === 'at_reception' && appointment.paymentStatus !== 'paid') {
        return res.status(400).json({ success: false, message: 'Cannot confirm appointment: payment has not been collected yet.' });
      }
    }

    let updateData = { status };

    if (status === 'cancelled') {
      updateData.cancellationReason = cancellationReason;
      updateData.cancelledById = userId;

      if (appointment.paymentStatus === 'paid' && appointment.paymentDetails && appointment.paymentDetails.paymentId) {
        try {
          if (!appointment.paymentDetails.orderId?.startsWith('order_mock_') && razorpay) {
            await razorpay.payments.refund(appointment.paymentDetails.paymentId, {
              notes: { reason: 'Cancelled by receptionist/doctor/admin', appointmentId }
            });
          }
          updateData.paymentStatus = 'refunded';

          // Update associated bill
          const bills = await prisma.bill.findMany({ where: { appointmentId, status: 'paid' } });
          for (let bill of bills) {
            await prisma.bill.update({ where: { id: bill.id }, data: { status: 'refunded' } });
          }
        } catch (refundError) {
          console.error('Refund processing failed:', refundError);
          updateData.notes = (appointment.notes || '') + '\n[Refund Failed: Please process manually]';
        }
      }
    }

    appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: updateData,
      include: {
        doctor: { include: { user: { select: { profile: true } } } },
        patient: { include: { user: { select: { profile: true } } } }
      }
    });

    res.json({ success: true, message: `Appointment ${status} successfully`, data: { appointment } });
  } catch (error) {
    console.error('Update appointment status error:', error);
    res.status(500).json({ success: false, message: 'Server error updating appointment' });
  }
});

// Cancel appointment (patient only)
router.patch('/:appointmentId/cancel', [
  body('reason').optional().isString()
], authenticateToken, authorizeRoles('patient'), async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { reason } = req.body;
    const userId = req.user.id || req.user._id;

    const patient = await prisma.patient.findUnique({ where: { userId } });
    if (!patient) return res.status(404).json({ success: false, message: 'Patient profile not found' });

    let appointment = await prisma.appointment.findUnique({ where: { id: appointmentId } });
    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });

    if (appointment.patientId !== patient.id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    if (!['pending', 'confirmed'].includes(appointment.status)) {
      return res.status(400).json({ success: false, message: 'Cannot cancel this appointment' });
    }

    let updateData = {
      status: 'cancelled',
      cancellationReason: reason,
      cancelledById: userId
    };

    if (appointment.paymentStatus === 'paid' && appointment.paymentDetails && appointment.paymentDetails.paymentId) {
      try {
        if (!appointment.paymentDetails.orderId?.startsWith('order_mock_') && razorpay) {
          await razorpay.payments.refund(appointment.paymentDetails.paymentId, {
            notes: { reason: reason || 'Cancelled by patient', appointmentId }
          });
        }
        updateData.paymentStatus = 'refunded';

        const bills = await prisma.bill.findMany({ where: { appointmentId, status: 'paid' } });
        for (let bill of bills) {
          await prisma.bill.update({ where: { id: bill.id }, data: { status: 'refunded' } });
        }
      } catch (refundError) {
        console.error('Refund processing failed:', refundError);
        updateData.notes = (appointment.notes || '') + '\n[Refund Failed: Please contact admin]';
      }
    }

    appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: updateData,
      include: {
        doctor: { include: { user: { select: { profile: true } } } },
        patient: { include: { user: { select: { profile: true } } } }
      }
    });

    res.json({ success: true, message: 'Appointment cancelled successfully', data: { appointment } });
  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({ success: false, message: 'Server error cancelling appointment' });
  }
});

// Get appointment details
router.get('/:appointmentId', authenticateToken, async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const userId = req.user.id || req.user._id;

    let appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        doctor: { include: { user: { select: { profile: true } } } },
        patient: { include: { user: { select: { profile: true } } } },
        prescription: true
      }
    });

    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });

    if (req.user.role === 'patient') {
      const patient = await prisma.patient.findUnique({ where: { userId } });
      if (!patient || appointment.patientId !== patient.id) {
        return res.status(403).json({ success: false, message: 'Access denied' });
      }
    } else if (req.user.role === 'doctor') {
      const doctor = await prisma.doctor.findUnique({ where: { userId } });
      if (!doctor || appointment.doctorId !== doctor.id) {
        return res.status(403).json({ success: false, message: 'Access denied' });
      }
    }

    res.json({ success: true, data: { appointment } });
  } catch (error) {
    console.error('Get appointment error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching appointment' });
  }
});

module.exports = router;
