const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const { authenticateToken, receptionistOnly } = require('../middleware/auth');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Bill = require('../models/Bill');
const LabReport = require('../models/LabReport');

// Configure multer for lab report uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/lab-reports/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `lab-report-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only JPEG, JPG, PNG, and PDF files are allowed'));
    }
  }
});

// All receptionist routes require receptionist authentication
router.use(authenticateToken);
router.use(receptionistOnly);

// Get all appointments
router.get('/appointments', async (req, res) => {
  try {
    let query = {};

    // Add date filter if provided
    if (req.query.date) {
      const startDate = new Date(req.query.date);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      
      query.date = {
        $gte: startDate,
        $lt: endDate
      };
    }

    // Add status filter if provided
    if (req.query.status) {
      query.status = req.query.status;
    }

    const appointments = await Appointment.find(query)
      .populate('doctorId')
      .populate('doctorId.userId', 'profile')
      .populate('patientId')
      .populate('patientId.userId', 'profile')
      .sort({ date: -1, 'timeSlot.start': -1 });

    res.json({
      success: true,
      data: { appointments }
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching appointments'
    });
  }
});

// Confirm appointment
router.patch('/appointment/:appointmentId/confirm', async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    if (appointment.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Cannot confirm this appointment'
      });
    }

    appointment.status = 'confirmed';
    await appointment.save();

    // Populate for response
    await appointment.populate([
      { path: 'doctorId', populate: { path: 'userId', select: 'profile' } },
      { path: 'patientId', populate: { path: 'userId', select: 'profile' } }
    ]);

    res.json({
      success: true,
      message: 'Appointment confirmed successfully',
      data: { appointment }
    });
  } catch (error) {
    console.error('Confirm appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error confirming appointment'
    });
  }
});

// Cancel appointment
router.patch('/appointment/:appointmentId/cancel', [
  body('reason').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { appointmentId } = req.params;
    const { reason } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    if (!['pending', 'confirmed'].includes(appointment.status)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel this appointment'
      });
    }

    appointment.status = 'cancelled';
    appointment.cancellationReason = reason;
    appointment.cancelledBy = req.user._id;

    // Refund logic would go here
    if (appointment.paymentStatus === 'paid') {
      appointment.paymentStatus = 'refunded';
    }

    await appointment.save();

    // Populate for response
    await appointment.populate([
      { path: 'doctorId', populate: { path: 'userId', select: 'profile' } },
      { path: 'patientId', populate: { path: 'userId', select: 'profile' } }
    ]);

    res.json({
      success: true,
      message: 'Appointment cancelled successfully',
      data: { appointment }
    });
  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error cancelling appointment'
    });
  }
});

// Get doctor availability
router.get('/doctors/availability', async (req, res) => {
  try {
    const doctors = await Doctor.find({ isAvailable: true })
      .populate('userId', 'profile')
      .select('specialization availability consultationFee');

    res.json({
      success: true,
      data: { doctors }
    });
  } catch (error) {
    console.error('Get doctor availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching doctor availability'
    });
  }
});

// Create bill
router.post('/bill', [
  body('patientId').isMongoId(),
  body('items').isArray(),
  body('items.*.description').notEmpty().trim(),
  body('items.*.quantity').isInt({ min: 1 }),
  body('items.*.unitPrice').isFloat({ min: 0 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { patientId, appointmentId, items, dueDate } = req.body;

    // Check if patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const tax = subtotal * 0.18; // 18% tax
    const total = subtotal + tax;

    // Create bill
    const bill = new Bill({
      patientId,
      appointmentId,
      items,
      subtotal,
      tax,
      total,
      dueDate: dueDate ? new Date(dueDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      createdBy: req.user._id
    });

    await bill.save();

    // Populate for response
    await bill.populate([
      { path: 'patientId', populate: { path: 'userId', select: 'profile' } },
      { path: 'createdBy', select: 'profile' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Bill created successfully',
      data: { bill }
    });
  } catch (error) {
    console.error('Create bill error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating bill'
    });
  }
});

// Upload lab report
router.post('/lab-report', [
  body('patientId').isMongoId(),
  body('testName').notEmpty().trim(),
  body('testType').notEmpty().trim(),
  body('reportDate').isISO8601()
], upload.single('reportFile'), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const { patientId, testName, testType, reportDate, doctorId, results, conclusion, recommendations } = req.body;

    // Check if patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    // Create lab report
    const labReport = new LabReport({
      patientId,
      testName,
      testType,
      reportDate: new Date(reportDate),
      doctorId: doctorId || undefined,
      results: results ? JSON.parse(results) : [],
      conclusion,
      recommendations,
      reportFile: req.file.filename,
      uploadedBy: req.user._id
    });

    await labReport.save();

    // Populate for response
    await labReport.populate([
      { path: 'patientId', populate: { path: 'userId', select: 'profile' } },
      { path: 'uploadedBy', select: 'profile' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Lab report uploaded successfully',
      data: { labReport }
    });
  } catch (error) {
    console.error('Upload lab report error:', error);
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 10MB'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error uploading lab report'
    });
  }
});

// Upload prescription receipt
router.post('/prescription-receipt', upload.single('receipt'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const { prescriptionId } = req.body;

    if (!prescriptionId) {
      return res.status(400).json({
        success: false,
        message: 'Prescription ID is required'
      });
    }

    const Prescription = require('../models/Prescription');
    const prescription = await Prescription.findById(prescriptionId);
    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: 'Prescription not found'
      });
    }

    // Update prescription with file path
    prescription.receipt = req.file.filename;
    await prescription.save();

    res.json({
      success: true,
      message: 'Prescription receipt uploaded successfully',
      data: {
        filename: req.file.filename,
        prescription
      }
    });
  } catch (error) {
    console.error('Upload prescription receipt error:', error);
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 10MB'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error uploading receipt'
    });
  }
});

// Get all bills
router.get('/bills', async (req, res) => {
  try {
    let query = {};

    // Add status filter if provided
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Add patient filter if provided
    if (req.query.patientId) {
      query.patientId = req.query.patientId;
    }

    const bills = await Bill.find(query)
      .populate('patientId')
      .populate('patientId.userId', 'profile')
      .populate('createdBy', 'profile')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { bills }
    });
  } catch (error) {
    console.error('Get bills error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching bills'
    });
  }
});

// Get all lab reports
router.get('/lab-reports', async (req, res) => {
  try {
    let query = {};

    // Add patient filter if provided
    if (req.query.patientId) {
      query.patientId = req.query.patientId;
    }

    const labReports = await LabReport.find(query)
      .populate('patientId')
      .populate('patientId.userId', 'profile')
      .populate('uploadedBy', 'profile')
      .sort({ reportDate: -1 });

    res.json({
      success: true,
      data: { labReports }
    });
  } catch (error) {
    console.error('Get lab reports error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching lab reports'
    });
  }
});

module.exports = router;
