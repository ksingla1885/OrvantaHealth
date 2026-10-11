const express = require('express');
const router = express.Router();
const { authenticateToken, patientOnly } = require('../middleware/auth');
const prisma = require('../prismaClient');

// Public endpoint - Get available doctors (no authentication required)
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      where: { isAvailable: true },
      include: {
        user: {
          select: { profile: true, isActive: true, isOffboarded: true }
        }
      }
    });

    const activeDoctors = doctors
      .filter(doc => doc.user && doc.user.isActive && !doc.user.isOffboarded)
      .map(doc => ({
        ...doc,
        user: doc.user,
        userId: doc.user ? { ...doc.user, id: doc.userId } : doc.userId
      }));

    res.json({
      success: true,
      data: { doctors: activeDoctors }
    });
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching doctors'
    });
  }
});

// All patient routes below require patient authentication
router.use(authenticateToken);
router.use(patientOnly);

// Middleware to attach patient record to request
const attachPatient = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    const patient = await prisma.patient.findUnique({ where: { userId } });
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile record not found'
      });
    }
    req.patient = patient;
    next();
  } catch (error) {
    console.error('Attach patient error:', error);
    res.status(500).json({ success: false, message: 'Server error resolving patient profile' });
  }
};

router.use(attachPatient);

// Get patient profile
router.get('/profile', async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const patient = await prisma.patient.findUnique({
      where: { userId },
      include: {
        user: {
          select: { email: true, profile: true }
        }
      }
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found'
      });
    }

    res.json({
      success: true,
      data: { patient }
    });
  } catch (error) {
    console.error('Get patient profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Update patient profile
router.patch('/profile', async (req, res) => {
  try {
    const { bloodGroup, emergencyContact, insuranceInfo, allergies } = req.body;
    const userId = req.user.id || req.user._id;

    const patient = await prisma.patient.update({
      where: { userId },
      data: {
        bloodGroup,
        emergencyContact: emergencyContact ? emergencyContact : undefined,
        insuranceInfo: insuranceInfo ? insuranceInfo : undefined,
        allergies: allergies ? allergies : undefined
      }
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { patient }
    });
  } catch (error) {
    console.error('Update patient profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating profile'
    });
  }
});

// Get doctor availability
router.get('/doctor/:doctorId/availability', async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
      include: {
        user: { select: { profile: true } }
      }
    });

    if (!doctor || !doctor.isAvailable) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found or not available'
      });
    }

    // Get booked slots for the next 60 days
    const today = new Date();
    const sixtyDaysLater = new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000);

    const bookedAppointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        date: { gte: today, lte: sixtyDaysLater },
        status: { in: ['pending', 'confirmed', 'checked_in'] }
      },
      select: {
        date: true,
        timeSlot: true
      }
    });

    res.json({
      success: true,
      data: {
        doctor,
        availability: doctor.availability,
        bookedSlots: bookedAppointments,
        leaves: doctor.leaves || []
      }
    });
  } catch (error) {
    console.error('Get doctor availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching availability'
    });
  }
});

// Get patient appointments
router.get('/appointments', async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { patientId: req.patient.id },
      include: {
        doctor: {
          include: {
            user: { select: { profile: true } }
          }
        }
      },
      orderBy: { date: 'desc' }
    });

    const formattedAppointments = appointments.map(appt => {
      const doctorObj = appt.doctor ? {
        ...appt.doctor,
        user: appt.doctor.user,
        userId: appt.doctor.user ? { ...appt.doctor.user, id: appt.doctor.userId } : appt.doctor.userId
      } : null;
      return {
        ...appt,
        doctor: doctorObj,
        doctorId: doctorObj || appt.doctorId
      };
    });

    res.json({
      success: true,
      data: { appointments: formattedAppointments }
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching appointments'
    });
  }
});

// Get patient bills
router.get('/bills', async (req, res) => {
  try {
    const bills = await prisma.bill.findMany({
      where: { patientId: req.patient.id },
      include: {
        appointment: {
          include: {
            doctor: {
              include: { user: { select: { profile: true } } }
            }
          }
        },
        createdBy: { select: { profile: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    const formattedBills = bills.map(bill => {
      const doctorObj = bill.appointment?.doctor ? {
        ...bill.appointment.doctor,
        user: bill.appointment.doctor.user,
        userId: bill.appointment.doctor.user ? { ...bill.appointment.doctor.user, id: bill.appointment.doctor.userId } : bill.appointment.doctor.userId
      } : null;

      const appointmentObj = bill.appointment ? {
        ...bill.appointment,
        doctor: doctorObj,
        doctorId: doctorObj || bill.appointment.doctorId
      } : null;

      return {
        ...bill,
        appointment: appointmentObj,
        appointmentId: appointmentObj || bill.appointmentId
      };
    });

    res.json({
      success: true,
      data: { bills: formattedBills }
    });
  } catch (error) {
    console.error('Get bills error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching bills'
    });
  }
});

// Get patient prescriptions
router.get('/prescriptions', async (req, res) => {
  try {
    const prescriptions = await prisma.prescription.findMany({
      where: { patientId: req.patient.id },
      include: {
        doctor: {
          include: {
            user: { select: { profile: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Map fields to match frontend expectations
    const mappedPrescriptions = prescriptions.map(p => {
      const doctorObj = p.doctor ? {
        ...p.doctor,
        user: p.doctor.user,
        userId: p.doctor.user ? { ...p.doctor.user, id: p.doctor.userId } : p.doctor.userId
      } : null;

      return {
        ...p,
        medications: p.medicines, // map medicines to medications
        instructions: p.advice,   // map advice to instructions
        doctor: doctorObj,
        doctorId: doctorObj || p.doctorId
      };
    });

    res.json({
      success: true,
      data: { prescriptions: mappedPrescriptions }
    });
  } catch (error) {
    console.error('Get prescriptions error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching prescriptions'
    });
  }
});

// Get patient lab reports
router.get('/lab-reports', async (req, res) => {
  try {
    const labReports = await prisma.labReport.findMany({
      where: { patientId: req.patient.id },
      include: {
        doctor: {
          include: { user: { select: { profile: true } } }
        },
        uploadedBy: { select: { profile: true } }
      },
      orderBy: { reportDate: 'desc' }
    });

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
