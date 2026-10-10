const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const { authenticateToken, doctorOnly } = require('../middleware/auth');
const prisma = require('../prismaClient');

const { prescriptionStorage } = require('../config/s3Storage');

const upload = multer({
  storage: prescriptionStorage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

router.use(authenticateToken);

// Update doctor availability (doctors update their own, receptionist/superadmin can update any doctor)
router.patch('/availability', [
  body('days').isArray(),
  body('timeSlots').isArray(),
  body('doctorId').optional().isUUID()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Validation errors', errors: errors.array() });
    }

    const { days, timeSlots, doctorId } = req.body;
    const userId = req.user.id || req.user._id;
    let doctor;

    if (req.user.role === 'doctor') {
      doctor = await prisma.doctor.findUnique({ where: { userId } });
      if (!doctor) return res.status(404).json({ success: false, message: 'Doctor profile not found' });
    } else if (req.user.role === 'receptionist' || req.user.role === 'superadmin') {
      if (!doctorId) return res.status(400).json({ success: false, message: 'doctorId is required for receptionist/superadmin' });
      doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
      if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });
    } else {
      return res.status(403).json({ success: false, message: 'Only doctors, receptionists, and superadmins can update availability' });
    }

    doctor = await prisma.doctor.update({
      where: { id: doctor.id },
      data: { availability: { days, timeSlots } },
      include: { user: { select: { email: true, profile: true, isActive: true, lastLogin: true } } }
    });

    res.json({ success: true, message: 'Availability updated successfully', data: { doctor } });
  } catch (error) {
    console.error('Update availability error:', error);
    res.status(500).json({ success: false, message: 'Server error updating availability' });
  }
});

router.use(doctorOnly);

// Get doctor dashboard stats
router.get('/dashboard-stats', async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const doctor = await prisma.doctor.findUnique({ where: { userId } });
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor profile not found' });

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const todayPatients = await prisma.appointment.count({
      where: {
        doctorId: doctor.id,
        date: { gte: startOfToday, lte: endOfToday },
        status: { not: 'pending' }
      }
    });

    const uniquePatientsRecords = await prisma.appointment.findMany({
      where: { doctorId: doctor.id },
      distinct: ['patientId'],
      select: { patientId: true }
    });
    const totalNetwork = uniquePatientsRecords.length;

    const activeScripts = await prisma.prescription.count({
      where: { doctorId: doctor.id }
    });

    const recentInteractions = await prisma.appointment.findMany({
      where: { doctorId: doctor.id, status: 'completed' },
      include: { patient: { include: { user: { select: { profile: true } } } } },
      orderBy: { updatedAt: 'desc' },
      take: 5
    });

    res.json({
      success: true,
      data: {
        stats: {
          todayPatients,
          totalNetwork,
          activeScripts,
          dutyStatus: doctor.dutyStatus || 'available'
        },
        recentInteractions: recentInteractions.map(interaction => ({
          id: interaction.id,
          patientName: `${interaction.patient?.user?.profile?.firstName || 'Unknown'} ${interaction.patient?.user?.profile?.lastName || 'Patient'}`,
          procedure: interaction.symptoms || 'Consultation', // using symptoms as reason
          time: interaction.updatedAt
        }))
      }
    });
  } catch (error) {
    console.error('Get doctor dashboard stats error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching dashboard stats' });
  }
});

// Get doctor profile
router.get('/profile', async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const doctor = await prisma.doctor.findUnique({
      where: { userId },
      include: { user: { select: { email: true, profile: true } } }
    });

    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor profile not found' });

    res.json({ success: true, data: { doctor } });
  } catch (error) {
    console.error('Get doctor profile error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get assigned appointments
router.get('/appointments', async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const doctor = await prisma.doctor.findUnique({ where: { userId } });
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor profile not found' });

    let query = { doctorId: doctor.id };

    if (req.query.date) {
      const startDate = new Date(req.query.date);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      query.date = { gte: startDate, lt: endDate };
    }

    if (req.query.status) {
      query.status = req.query.status;
    } else {
      query.status = { not: 'pending' };
    }

    const appointments = await prisma.appointment.findMany({
      where: query,
      include: {
        patient: { include: { user: { select: { profile: true } } } },
        prescription: true
      },
      orderBy: [{ date: 'desc' }] // we can't easily order by JSON timeSlot.start, but date is fine
    });

    res.json({ success: true, data: { appointments } });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching appointments' });
  }
});

// Get patient medical history
router.get('/patient/:patientId/history', async (req, res) => {
  try {
    const { patientId } = req.params;
    const userId = req.user.id || req.user._id;

    const doctor = await prisma.doctor.findUnique({ where: { userId } });
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor profile not found' });

    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      include: { user: { select: { profile: true, email: true } } }
    });

    if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });

    // Ensure backwards compatibility with old triage logic
    const patientProfile = patient.user?.profile || {};
    const patientName = `${patientProfile.firstName || ''} ${patientProfile.lastName || ''}`.trim();
    const phone = patientProfile.phone || '';

    const [prescriptions, triageRecords, labReports, bills, appointments] = await Promise.all([
      prisma.prescription.findMany({
        where: { patientId },
        include: { doctor: { include: { user: { select: { profile: true } } } } },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.triageRecord.findMany({
        where: {
          OR: [
            { patientId },
            { contactNumber: phone },
            { patientName: { contains: patientName } }
          ]
        },
        include: { doctorReferred: { select: { profile: true } } },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.labReport.findMany({
        where: { patientId },
        include: {
          uploadedBy: { select: { profile: true } },
          doctor: { include: { user: { select: { profile: true } } } }
        },
        orderBy: { reportDate: 'desc' }
      }),
      prisma.bill.findMany({
        where: { patientId },
        include: { createdBy: { select: { profile: true } } },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.appointment.findMany({
        where: { patientId },
        include: { doctor: { include: { user: { select: { profile: true } } } } },
        orderBy: { date: 'desc' }
      })
    ]);

    const lastPrescriptionWithDoctor = prescriptions.find(p => p.doctorId === doctor.id) || null;

    const vitalsHistory = triageRecords
      .filter(tr => tr.vitals && Object.keys(tr.vitals).length > 0)
      .map(tr => ({
        date: tr.createdAt,
        temperature: tr.vitals.temperature,
        bloodPressure: tr.vitals.bloodPressure,
        pulseRate: tr.vitals.pulseRate,
        spO2: tr.vitals.spO2
      }));

    const today = new Date();
    today.setHours(0,0,0,0);
    const missedFollowUps = appointments.filter(apt => 
      new Date(apt.date) < today && 
      ['pending', 'confirmed'].includes(apt.status)
    );

    const timeline = [];

    prescriptions.forEach(p => {
      timeline.push({
        id: p.id, date: p.createdAt, type: 'prescription',
        title: `Prescription issued for ${p.diagnosis}`,
        doctor: p.doctor?.user?.profile ? `Dr. ${p.doctor.user.profile.firstName} ${p.doctor.user.profile.lastName}` : 'System Clinician',
        facility: p.receipt ? 'Prescription Receipt Available' : 'Digital Prescription',
        status: 'Dispensed',
        details: { diagnosis: p.diagnosis, medicines: p.medicines, advice: p.advice, tests: p.tests, followUpDate: p.followUpDate, receipt: p.receipt }
      });
    });

    triageRecords.forEach(tr => {
      const ai = tr.aiAnalysis || {};
      timeline.push({
        id: tr.id, date: tr.createdAt, type: 'triage',
        title: tr.status === 'resolved' ? 'Walk-In Triage Resolved' : 'Symptom Triage Intake',
        doctor: tr.doctorReferred?.profile ? `Referred to Dr. ${tr.doctorReferred.profile.firstName} ${tr.doctorReferred.profile.lastName}` : 'Lobby Queue',
        facility: `Risk Score: ${ai.riskScore || 0}/10 (${ai.urgencyLevel || 'Routine'})`,
        status: tr.status === 'resolved' ? 'Archived' : 'Active Intake',
        details: { symptoms: tr.symptoms, vitals: tr.vitals, aiAnalysis: ai, diagnosis: tr.diagnosis, prescribedMedicines: tr.prescribedMedicines, advice: tr.advice, tests: tr.tests }
      });
    });

    labReports.forEach(lr => {
      timeline.push({
        id: lr.id, date: lr.reportDate, type: 'lab',
        title: lr.testName,
        doctor: lr.doctor?.user?.profile ? `Ordered by Dr. ${lr.doctor.user.profile.firstName} ${lr.doctor.user.profile.lastName}` : 'General Referral',
        facility: `Type: ${lr.testType} • Report File Available`,
        status: 'Completed',
        details: { testName: lr.testName, testType: lr.testType, results: lr.results, conclusion: lr.conclusion, recommendations: lr.recommendations, reportFile: lr.reportFile }
      });
    });

    bills.forEach(b => {
      timeline.push({
        id: b.id, date: b.createdAt, type: 'billing',
        title: `Invoice Generated: ₹${b.total}`,
        doctor: b.createdBy?.profile ? `Billed by ${b.createdBy.profile.firstName}` : 'Billing System',
        facility: b.paymentMethod ? `Paid via ${b.paymentMethod}` : 'Dues Pending',
        status: b.status.toUpperCase(),
        details: { items: b.items, total: b.total, status: b.status, dueDate: b.dueDate, receipt: b.receipt }
      });
    });

    appointments.forEach(apt => {
      timeline.push({
        id: apt.id, date: apt.date, type: 'consultation',
        title: `Appointment Slot: ${apt.timeSlot?.start || ''} - ${apt.timeSlot?.end || ''}`,
        doctor: apt.doctor?.user?.profile ? `Dr. ${apt.doctor.user.profile.firstName} ${apt.doctor.user.profile.lastName}` : 'Central Queue',
        facility: `Type: ${apt.consultationType || 'In-Person'}`,
        status: apt.status.toUpperCase(),
        details: { status: apt.status, symptoms: apt.symptoms, notes: apt.notes, cancellationReason: apt.cancellationReason }
      });
    });

    timeline.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({
      success: true,
      data: { patient, timeline, vitalsHistory, lastPrescriptionWithDoctor, missedFollowUps }
    });
  } catch (error) {
    console.error('Get patient history error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching patient history' });
  }
});

// Create prescription
router.post('/prescription', [
  body('appointmentId').isUUID(),
  body('diagnosis').notEmpty().trim(),
  body('medicines').isArray(),
  body('medicines.*.name').notEmpty().trim(),
  body('medicines.*.dosage').notEmpty().trim(),
  body('medicines.*.frequency').notEmpty().trim(),
  body('medicines.*.duration').notEmpty().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: 'Validation errors', errors: errors.array() });

    const { appointmentId, diagnosis, medicines, tests, advice, followUpDate } = req.body;
    const userId = req.user.id || req.user._id;

    const doctor = await prisma.doctor.findUnique({ where: { userId } });
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor profile not found' });

    let appointment = await prisma.appointment.findUnique({ where: { id: appointmentId } });
    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });

    if (appointment.doctorId !== doctor.id) return res.status(403).json({ success: false, message: 'Access denied' });
    if (appointment.status !== 'checked_out') return res.status(403).json({ success: false, message: 'Prescription can only be created after patient checkout' });

    const prescription = await prisma.prescription.create({
      data: {
        appointmentId,
        patientId: appointment.patientId,
        doctorId: doctor.id,
        diagnosis,
        medicines,
        tests: tests || [],
        advice,
        followUpDate: followUpDate ? new Date(followUpDate) : null
      },
      include: {
        patient: { include: { user: { select: { profile: true } } } },
        doctor: { include: { user: { select: { profile: true } } } }
      }
    });

    appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: 'completed' }
    });

    res.status(201).json({ success: true, message: 'Prescription created successfully', data: { prescription } });
  } catch (error) {
    console.error('Create prescription error:', error);
    res.status(500).json({ success: false, message: 'Server error creating prescription' });
  }
});

// Get prescription by appointment ID
router.get('/prescription/appointment/:appointmentId', async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const prescription = await prisma.prescription.findUnique({
      where: { appointmentId },
      include: {
        patient: { include: { user: { select: { profile: true } } } },
        doctor: { include: { user: { select: { profile: true } } } }
      }
    });

    if (!prescription) return res.status(404).json({ success: false, message: 'Prescription not found' });

    res.json({ success: true, data: { prescription } });
  } catch (error) {
    console.error('Get prescription error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching prescription' });
  }
});

// Update prescription
router.patch('/prescription/:prescriptionId', [
  body('diagnosis').optional().trim(),
  body('medicines').optional().isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: 'Validation errors', errors: errors.array() });

    const { prescriptionId } = req.params;
    const { diagnosis, medicines, tests, advice, followUpDate } = req.body;
    const userId = req.user.id || req.user._id;

    const doctor = await prisma.doctor.findUnique({ where: { userId } });
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor profile not found' });

    let prescription = await prisma.prescription.findUnique({ where: { id: prescriptionId } });
    if (!prescription) return res.status(404).json({ success: false, message: 'Prescription not found' });

    if (prescription.doctorId !== doctor.id) return res.status(403).json({ success: false, message: 'Access denied' });

    prescription = await prisma.prescription.update({
      where: { id: prescriptionId },
      data: {
        diagnosis: diagnosis || prescription.diagnosis,
        medicines: medicines || prescription.medicines,
        tests: tests || prescription.tests,
        advice: advice || prescription.advice,
        followUpDate: followUpDate ? new Date(followUpDate) : prescription.followUpDate
      }
    });

    res.json({ success: true, message: 'Prescription updated successfully', data: { prescription } });
  } catch (error) {
    console.error('Update prescription error:', error);
    res.status(500).json({ success: false, message: 'Server error updating prescription' });
  }
});

// Upload prescription receipt
router.post('/prescription/:prescriptionId/receipt', upload.single('receipt'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    const { prescriptionId } = req.params;
    const userId = req.user.id || req.user._id;

    const doctor = await prisma.doctor.findUnique({ where: { userId } });
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor profile not found' });

    let prescription = await prisma.prescription.findUnique({ where: { id: prescriptionId } });
    if (!prescription) return res.status(404).json({ success: false, message: 'Prescription not found' });

    if (prescription.doctorId !== doctor.id) return res.status(403).json({ success: false, message: 'Access denied' });

    prescription = await prisma.prescription.update({
      where: { id: prescriptionId },
      data: { receipt: req.file.path }
    });

    res.json({
      success: true,
      message: 'Prescription receipt uploaded successfully',
      data: { filename: req.file.path, prescription }
    });
  } catch (error) {
    console.error('Upload prescription receipt error:', error);
    if (error.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ success: false, message: 'File size too large. Maximum size is 5MB' });
    res.status(500).json({ success: false, message: 'Server error uploading receipt' });
  }
});

// Get doctor's prescriptions
router.get('/prescriptions', async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const doctor = await prisma.doctor.findUnique({ where: { userId } });
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor profile not found' });

    const prescriptions = await prisma.prescription.findMany({
      where: { doctorId: doctor.id },
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
    console.error('Get prescriptions error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching prescriptions' });
  }
});

// Mark appointment as completed
router.patch('/appointment/:appointmentId/complete', async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const userId = req.user.id || req.user._id;

    const doctor = await prisma.doctor.findUnique({ where: { userId } });
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor profile not found' });

    let appointment = await prisma.appointment.findUnique({ where: { id: appointmentId } });
    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });

    if (appointment.doctorId !== doctor.id) return res.status(403).json({ success: false, message: 'Access denied' });

    appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: 'completed' }
    });

    res.json({ success: true, message: 'Appointment marked as completed', data: { appointment } });
  } catch (error) {
    console.error('Complete appointment error:', error);
    res.status(500).json({ success: false, message: 'Server error completing appointment' });
  }
});

module.exports = router;
