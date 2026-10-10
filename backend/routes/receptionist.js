const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const prisma = require('../prismaClient');
const razorpay = require('../utils/razorpay');

const { labReportStorage, prescriptionStorage } = require('../config/s3Storage');

const upload = multer({
  storage: labReportStorage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

const receiptUpload = multer({
  storage: prescriptionStorage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

router.use(authenticateToken);
router.use(authorizeRoles('receptionist', 'superadmin'));

// Get all appointments
router.get('/appointments', async (req, res) => {
  try {
    let query = {};

    if (req.query.date) {
      const startDate = new Date(req.query.date);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      query.date = { gte: startDate, lt: endDate };
    }

    if (req.query.status) {
      query.status = req.query.status;
    }

    const appointments = await prisma.appointment.findMany({
      where: query,
      include: {
        doctor: { include: { user: { select: { profile: true } } } },
        patient: { include: { user: { select: { profile: true } } } }
      },
      orderBy: [{ date: 'desc' }]
    });

    res.json({ success: true, data: { appointments } });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching appointments' });
  }
});

// Confirm appointment
router.patch('/appointment/:appointmentId/confirm', async (req, res) => {
  try {
    const { appointmentId } = req.params;

    let appointment = await prisma.appointment.findUnique({ where: { id: appointmentId } });
    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });

    if (appointment.status !== 'pending') {
      return res.status(400).json({ success: false, message: 'Cannot confirm this appointment' });
    }

    appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: 'confirmed' },
      include: {
        doctor: { include: { user: { select: { profile: true } } } },
        patient: { include: { user: { select: { profile: true } } } }
      }
    });

    res.json({ success: true, message: 'Appointment confirmed successfully', data: { appointment } });
  } catch (error) {
    console.error('Confirm appointment error:', error);
    res.status(500).json({ success: false, message: 'Server error confirming appointment' });
  }
});

// Cancel appointment
router.patch('/appointment/:appointmentId/cancel', [
  body('reason').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: 'Validation errors', errors: errors.array() });

    const { appointmentId } = req.params;
    const { reason } = req.body;
    const userId = req.user.id || req.user._id;

    let appointment = await prisma.appointment.findUnique({ where: { id: appointmentId } });
    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });

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
            notes: { reason: reason || 'Cancelled by receptionist/admin', appointmentId }
          });
        }
        updateData.paymentStatus = 'refunded';

        const bills = await prisma.bill.findMany({ where: { appointmentId, status: 'paid' } });
        for (let bill of bills) {
          await prisma.bill.update({ where: { id: bill.id }, data: { status: 'refunded' } });
        }
      } catch (refundError) {
        console.error('Refund processing failed during receptionist cancellation:', refundError);
        updateData.notes = (appointment.notes || '') + '\n[Refund Failed: Please process manually]';
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

// Get doctor availability
router.get('/doctors/availability', async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: { user: { select: { profile: true, isActive: true, isOffboarded: true } } }
    });

    const activeDoctors = doctors.filter(doc => doc.user && doc.user.isActive && !doc.user.isOffboarded).map(doc => ({
      id: doc.id,
      specialization: doc.specialization,
      availability: doc.availability,
      consultationFee: doc.consultationFee,
      isAvailable: doc.isAvailable,
      dutyStatus: doc.dutyStatus,
      user: doc.user
    }));

    res.json({ success: true, data: { doctors: activeDoctors } });
  } catch (error) {
    console.error('Get doctor availability error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching doctor availability' });
  }
});

// Update doctor availability (receptionist can update any doctor)
router.patch('/doctors/:doctorId/availability', [
  body('days').isArray(),
  body('timeSlots').isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: 'Validation errors', errors: errors.array() });

    const { doctorId } = req.params;
    const { days, timeSlots } = req.body;

    let doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });

    doctor = await prisma.doctor.update({
      where: { id: doctorId },
      data: { availability: { days, timeSlots } },
      include: { user: { select: { profile: true } } }
    });

    res.json({ success: true, message: 'Doctor availability updated successfully', data: { doctor } });
  } catch (error) {
    console.error('Update doctor availability error:', error);
    res.status(500).json({ success: false, message: 'Server error updating doctor availability' });
  }
});

// Update doctor duty status
router.patch('/doctors/:doctorId/duty-status', [
  body('dutyStatus').isIn(['available', 'rounds', 'busy']).withMessage('Invalid duty status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: 'Validation errors', errors: errors.array() });

    const { doctorId } = req.params;
    const { dutyStatus } = req.body;
    const isAvailable = dutyStatus === 'available';

    let doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });

    doctor = await prisma.doctor.update({
      where: { id: doctorId },
      data: { dutyStatus, isAvailable },
      include: { user: { select: { profile: true } } }
    });

    res.json({ success: true, message: 'Doctor duty status updated successfully', data: { doctor } });
  } catch (error) {
    console.error('Update doctor duty status error:', error);
    res.status(500).json({ success: false, message: 'Server error updating doctor duty status' });
  }
});

// Get doctor leaves
router.get('/doctors/:doctorId/leaves', async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await prisma.doctor.findUnique({ where: { id: doctorId }, select: { leaves: true } });

    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });

    res.json({ success: true, data: { leaves: doctor.leaves || [] } });
  } catch (error) {
    console.error('Get doctor leaves error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching doctor leaves' });
  }
});

// Add doctor leave
router.post('/doctors/:doctorId/leave', [
  body('date').isISO8601().withMessage('Please provide a valid date (YYYY-MM-DD)')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: 'Validation errors', errors: errors.array() });

    const { doctorId } = req.params;
    const { date } = req.body;
    const leaveDate = date.split('T')[0];

    let doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });

    let leaves = Array.isArray(doctor.leaves) ? [...doctor.leaves] : [];
    if (leaves.includes(leaveDate)) return res.status(400).json({ success: false, message: 'Leave already marked for this date' });

    leaves.push(leaveDate);
    doctor = await prisma.doctor.update({ where: { id: doctorId }, data: { leaves } });

    res.json({ success: true, message: 'Leave marked successfully', data: { leaves: doctor.leaves } });
  } catch (error) {
    console.error('Add doctor leave error:', error);
    res.status(500).json({ success: false, message: 'Server error marking leave' });
  }
});

// Remove doctor leave
router.delete('/doctors/:doctorId/leave/:date', async (req, res) => {
  try {
    const { doctorId, date } = req.params;

    let doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });

    let leaves = Array.isArray(doctor.leaves) ? doctor.leaves.filter(l => l !== date) : [];
    doctor = await prisma.doctor.update({ where: { id: doctorId }, data: { leaves } });

    res.json({ success: true, message: 'Leave removed successfully', data: { leaves: doctor.leaves } });
  } catch (error) {
    console.error('Remove doctor leave error:', error);
    res.status(500).json({ success: false, message: 'Server error removing leave' });
  }
});

// Create bill
router.post('/bill', [
  body('patientId').optional().isUUID(),
  body('items').isArray(),
  body('items.*.description').notEmpty().trim(),
  body('items.*.quantity').isInt({ min: 1 }),
  body('items.*.unitPrice').isFloat({ min: 0 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: 'Validation errors', errors: errors.array() });

    const { patientId, triageId, appointmentId, items, dueDate, paymentMethod, status } = req.body;
    const userId = req.user.id || req.user._id;

    const processedItems = items.map(item => ({ ...item, total: item.quantity * item.unitPrice }));

    if (patientId) {
      const patient = await prisma.patient.findUnique({ where: { id: patientId } });
      if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    const subtotal = processedItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    const bill = await prisma.bill.create({
      data: {
        patientId: patientId || null,
        triageId: triageId || null,
        appointmentId: appointmentId || null,
        items: processedItems,
        subtotal,
        tax,
        total,
        dueDate: dueDate ? new Date(dueDate) : new Date(),
        paymentMethod: paymentMethod || null,
        status: status || 'draft',
        createdById: userId
      },
      include: {
        patient: { include: { user: { select: { profile: true } } } },
        createdBy: { select: { profile: true } }
      }
    });

    res.status(201).json({ success: true, message: 'Bill created successfully', data: { bill } });
  } catch (error) {
    console.error('Create bill error:', error);
    res.status(500).json({ success: false, message: 'Server error creating bill' });
  }
});

// Upload lab report
router.post('/lab-report', upload.single('reportFile'), [
  body('patientId').isUUID(),
  body('testName').notEmpty().trim(),
  body('testType').notEmpty().trim(),
  body('reportDate').isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: 'Validation errors', errors: errors.array() });
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    const { patientId, testName, testType, reportDate, doctorId, results, conclusion, recommendations } = req.body;
    const userId = req.user.id || req.user._id;

    const patient = await prisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });

    const labReport = await prisma.labReport.create({
      data: {
        patientId,
        testName,
        testType,
        reportDate: new Date(reportDate),
        doctorId: doctorId || null,
        results: results ? JSON.parse(results) : [],
        conclusion,
        recommendations,
        reportFile: req.file.path,
        uploadedById: userId
      },
      include: {
        patient: { include: { user: { select: { profile: true } } } },
        uploadedBy: { select: { profile: true } }
      }
    });

    res.status(201).json({ success: true, message: 'Lab report uploaded successfully', data: { labReport } });
  } catch (error) {
    console.error('Upload lab report error:', error);
    if (error.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ success: false, message: 'File size too large. Maximum size is 10MB' });
    res.status(500).json({ success: false, message: 'Server error uploading lab report' });
  }
});

// Upload prescription receipt
router.post('/prescription-receipt', receiptUpload.single('receipt'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    const { prescriptionId } = req.body;
    if (!prescriptionId) return res.status(400).json({ success: false, message: 'Prescription ID is required' });

    let prescription = await prisma.prescription.findUnique({ where: { id: prescriptionId } });
    if (!prescription) return res.status(404).json({ success: false, message: 'Prescription not found' });

    prescription = await prisma.prescription.update({
      where: { id: prescriptionId },
      data: { receipt: req.file.path }
    });

    res.json({ success: true, message: 'Prescription receipt uploaded successfully', data: { filename: req.file.path, prescription } });
  } catch (error) {
    console.error('Upload prescription receipt error:', error);
    if (error.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ success: false, message: 'File size too large. Maximum size is 10MB' });
    res.status(500).json({ success: false, message: 'Server error uploading receipt' });
  }
});

// Get all bills
router.get('/bills', async (req, res) => {
  try {
    let query = {};
    if (req.query.status) query.status = req.query.status;
    if (req.query.patientId) query.patientId = req.query.patientId;

    const bills = await prisma.bill.findMany({
      where: query,
      include: {
        patient: { include: { user: { select: { profile: true } } } },
        appointment: { include: { doctor: { include: { user: { select: { profile: true } } } } } },
        createdBy: { select: { profile: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, data: { bills } });
  } catch (error) {
    console.error('Get bills error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching bills' });
  }
});

// Mark bill as paid
router.patch('/bill/:billId/mark-paid', async (req, res) => {
  try {
    const { billId } = req.params;
    let bill = await prisma.bill.findUnique({ where: { id: billId } });
    if (!bill) return res.status(404).json({ success: false, message: 'Bill not found' });

    bill = await prisma.bill.update({
      where: { id: billId },
      data: { status: 'paid', paymentMethod: 'cash' }
    });

    res.json({ success: true, message: 'Bill marked as paid successfully', data: { bill } });
  } catch (error) {
    console.error('Mark bill paid error:', error);
    res.status(500).json({ success: false, message: 'Server error marking bill as paid' });
  }
});

// Get all lab reports
router.get('/lab-reports', async (req, res) => {
  try {
    let query = {};
    if (req.query.patientId) query.patientId = req.query.patientId;

    const labReports = await prisma.labReport.findMany({
      where: query,
      include: {
        patient: { include: { user: { select: { profile: true } } } },
        doctor: { include: { user: { select: { profile: true } } } },
        uploadedBy: { select: { profile: true } }
      },
      orderBy: { reportDate: 'desc' }
    });

    res.json({ success: true, data: { labReports } });
  } catch (error) {
    console.error('Get lab reports error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching lab reports' });
  }
});

// Upload bill receipt
router.post('/bill/:billId/receipt', receiptUpload.single('receipt'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    const { billId } = req.params;
    let bill = await prisma.bill.findUnique({ where: { id: billId } });
    if (!bill) return res.status(404).json({ success: false, message: 'Bill not found' });

    bill = await prisma.bill.update({
      where: { id: billId },
      data: { receipt: req.file.path }
    });

    res.json({ success: true, message: 'Bill receipt uploaded successfully', data: { filename: req.file.path, bill } });
  } catch (error) {
    console.error('Upload bill receipt error:', error);
    if (error.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ success: false, message: 'File size too large. Maximum size is 10MB' });
    res.status(500).json({ success: false, message: 'Server error uploading receipt' });
  }
});

// Get prescriptions for a specific patient
router.get('/patient/:patientId/prescriptions', async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await prisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });

    const prescriptions = await prisma.prescription.findMany({
      where: { patientId },
      include: {
        patient: { include: { user: { select: { profile: true } } } },
        doctor: { include: { user: { select: { profile: true } } } },
        appointment: { select: { date: true, timeSlot: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    const mappedPrescriptions = prescriptions.map(p => ({
      ...p,
      medications: p.medicines,
      instructions: p.advice
    }));

    res.json({ success: true, data: { prescriptions: mappedPrescriptions } });
  } catch (error) {
    console.error('Get patient prescriptions error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching patient prescriptions' });
  }
});

module.exports = router;
