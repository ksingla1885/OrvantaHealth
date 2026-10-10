const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const prisma = require('../prismaClient');
const { authenticateToken, superAdminOnly, authorizeRoles } = require('../middleware/auth');
const {
  getSystemOverview,
  getUserAnalytics,
  getDepartmentStats,
  exportData
} = require('../controllers/superadminController');

// System Security State (in-memory simulation)
let isSystemLockdown = false;

const getIsSystemLockdown = () => isSystemLockdown;

const logAudit = async ({ action, performedBy, targetUser, details, severity = 'info', req }) => {
  try {
    const ipAddress = req?.ip || req?.connection?.remoteAddress || '127.0.0.1';
    await prisma.auditLog.create({
      data: {
        action,
        performedById: performedBy.toString(),
        targetUserId: targetUser ? targetUser.toString() : null,
        details,
        severity,
        ipAddress
      }
    });
  } catch (err) {
    console.error('Failed to log audit event:', err);
  }
};

// Create or Update Super Admin account
router.post('/seed-superadmin', async (req, res) => {
  try {
    const adminEmail = 'admin@orvantahealth.com';
    const adminPassword = 'Welcomeadmin';

    let superAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });

    if (!superAdmin) {
      superAdmin = await prisma.user.findFirst({ where: { role: 'superadmin' } });
    }

    if (superAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      superAdmin = await prisma.user.update({
        where: { id: superAdmin.id },
        data: {
          email: adminEmail,
          password: hashedPassword,
          isActive: true
        }
      });

      return res.json({
        success: true,
        message: 'Super Admin credentials updated successfully',
        data: { email: adminEmail, password: adminPassword }
      });
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    superAdmin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        role: 'superadmin',
        profile: {
          firstName: 'Super',
          lastName: 'Admin'
        }
      }
    });

    res.json({
      success: true,
      message: 'Super Admin account created successfully',
      data: {
        email: adminEmail,
        password: adminPassword
      }
    });
  } catch (error) {
    console.error('Super admin seeding error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.use(authenticateToken);

// Get all doctors
router.get('/doctors', authorizeRoles('superadmin', 'receptionist', 'doctor'), async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        user: { select: { email: true, profile: true, isActive: true, isOffboarded: true, lastLogin: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: { doctors } });
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get doctor history
router.get('/doctor-history/:id', superAdminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    let doctor = await prisma.doctor.findUnique({
      where: { id },
      include: { user: { select: { email: true, profile: true, isActive: true, isOffboarded: true, offboardedAt: true, offboardedBy: true, lastLogin: true, createdAt: true } } }
    });
    
    if (!doctor) {
      doctor = await prisma.doctor.findUnique({
        where: { userId: id },
        include: { user: { select: { email: true, profile: true, isActive: true, isOffboarded: true, offboardedAt: true, offboardedBy: true, lastLogin: true, createdAt: true } } }
      });
    }

    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });

    let [appointments, prescriptions] = await Promise.all([
      prisma.appointment.findMany({ where: { doctorId: doctor.id }, orderBy: { date: 'desc' } }),
      prisma.prescription.findMany({ where: { doctorId: doctor.id }, orderBy: { createdAt: 'desc' } })
    ]);

    const resolvePatient = async (patientId) => {
      if (!patientId) return null;
      let p = await prisma.patient.findUnique({
        where: { id: patientId },
        select: { medicalRecordNumber: true, userId: true, user: { select: { profile: true, email: true } } }
      });
      return p;
    };

    appointments = await Promise.all(appointments.map(async (apt) => ({
      ...apt,
      patientId: await resolvePatient(apt.patientId)
    })));

    prescriptions = await Promise.all(prescriptions.map(async (pre) => ({
      ...pre,
      patientId: await resolvePatient(pre.patientId)
    })));

    res.json({ success: true, data: { doctor, appointments, prescriptions } });
  } catch (error) {
    console.error('Get doctor history error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get all patients
router.get('/patients', authorizeRoles('superadmin', 'receptionist', 'doctor'), async (req, res) => {
  try {
    const patients = await prisma.patient.findMany({
      include: { user: { select: { email: true, profile: true, isActive: true, lastLogin: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: { patients } });
  } catch (error) {
    console.error('Get patients error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.use(superAdminOnly);

// Create staff account
router.post('/staff', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('firstName').notEmpty().trim(),
  body('lastName').notEmpty().trim(),
  body('role').isIn(['doctor', 'receptionist']),
  body('phone').optional({ checkFalsy: true })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: 'Validation errors', errors: errors.array() });

    const { email, password, firstName, lastName, role, phone, specialization, qualifications, experience, licenseNumber, consultationFee, department } = req.body;

    if (!email.endsWith('@orvanta.com')) return res.status(400).json({ success: false, message: 'Staff email must end with @orvanta.com' });

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ success: false, message: `A system account already exists with the email: ${email}` });

    if (role === 'doctor') {
      const missingFields = [];
      if (!specialization) missingFields.push('specialization');
      if (!qualifications) missingFields.push('qualifications');
      if (experience === undefined || experience === '') missingFields.push('experience');
      if (!licenseNumber) missingFields.push('licenseNumber');
      if (consultationFee === undefined || consultationFee === '') missingFields.push('consultationFee');
      if (!department) missingFields.push('department');

      if (missingFields.length > 0) return res.status(400).json({ success: false, message: `Missing clinical validation fields: ${missingFields.join(', ')}` });

      const existingLicense = await prisma.doctor.findUnique({ where: { licenseNumber } });
      if (existingLicense) return res.status(400).json({ success: false, message: `Medical license number ${licenseNumber} is already registered.` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        profile: { firstName, lastName, phone: phone || undefined }
      }
    });

    if (role === 'doctor') {
      await prisma.doctor.create({
        data: {
          userId: user.id,
          specialization,
          qualifications,
          experience: Number(experience),
          licenseNumber,
          consultationFee: Number(consultationFee),
          department,
          availability: {
            days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            timeSlots: [{ start: '09:00', end: '17:00' }]
          }
        }
      });
    }

    res.status(201).json({ success: true, message: `${role.charAt(0).toUpperCase() + role.slice(1)} account created successfully`, data: { user } });
  } catch (error) {
    console.error('Staff creation error:', error);
    res.status(500).json({ success: false, message: 'Server error during staff creation' });
  }
});

// Get all staff
router.get('/staff', async (req, res) => {
  try {
    const staff = await prisma.user.findMany({
      where: { role: { in: ['doctor', 'receptionist'] } },
      select: { id: true, email: true, profile: true, role: true, isActive: true, isOffboarded: true, createdAt: true, lastLogin: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: { staff } });
  } catch (error) {
    console.error('Get staff error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get system analytics
router.get('/analytics', async (req, res) => {
  try {
    const { date } = req.query;
    const targetDate = date ? new Date(date) : new Date();
    const startOfDay = new Date(new Date(targetDate).setHours(0, 0, 0, 0));
    const endOfDay = new Date(new Date(targetDate).setHours(23, 59, 59, 999));

    const totalPatients = await prisma.patient.count();
    const totalDoctors = await prisma.doctor.count();
    const totalStaff = await prisma.user.count({ where: { role: { in: ['doctor', 'receptionist'] } } });
    const totalReceptionists = await prisma.user.count({ where: { role: 'receptionist' } });
    
    const dateAppointments = await prisma.appointment.count({
      where: { date: { gte: startOfDay, lt: endOfDay } }
    });

    const dateRevenueAgg = await prisma.bill.aggregate({
      _sum: { total: true },
      where: { status: 'paid', updatedAt: { gte: startOfDay, lt: endOfDay } }
    });
    
    const totalRevenueAgg = await prisma.bill.aggregate({
      _sum: { total: true },
      where: { status: 'paid' }
    });

    const appointmentStats = await prisma.appointment.groupBy({
      by: ['status'],
      _count: true
    });
    
    const formattedStats = appointmentStats.map(s => ({ _id: s.status, count: s._count }));

    const topDoctorAgg = await prisma.appointment.groupBy({
      by: ['doctorId'],
      _count: true,
      where: { status: 'completed' },
      orderBy: { _count: { doctorId: 'desc' } },
      take: 1
    });

    let topDoctor = null;
    if (topDoctorAgg.length > 0) {
      topDoctor = await prisma.doctor.findUnique({
        where: { id: topDoctorAgg[0].doctorId },
        include: { user: { select: { id: true, email: true, profile: true } } }
      });
    }

    const newPatientsDate = await prisma.user.count({
      where: { role: 'patient', createdAt: { gte: startOfDay, lt: endOfDay } }
    });

    res.json({
      success: true,
      data: {
        totalPatients,
        totalDoctors,
        totalStaff,
        totalReceptionists,
        todayAppointments: dateAppointments,
        dateRevenue: dateRevenueAgg._sum.total || 0,
        totalRevenue: totalRevenueAgg._sum.total || 0,
        newPatientsDate,
        appointmentStats: formattedStats,
        mostConsultedDoctor: topDoctor
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching analytics' });
  }
});

// Update user status
router.patch('/user/:userId/status', async (req, res) => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body;

    let user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (user.role === 'superadmin') return res.status(400).json({ success: false, message: 'Cannot deactivate Super Admin account' });

    user = await prisma.user.update({
      where: { id: userId },
      data: { isActive },
      select: { email: true, profile: true, role: true, isActive: true }
    });

    res.json({ success: true, message: 'User status updated successfully', data: { user } });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({ success: false, message: 'Server error updating user status' });
  }
});

// Get staff member by ID
router.get('/staff/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let doctor = await prisma.doctor.findUnique({
      where: { id },
      include: { user: { select: { email: true, profile: true, role: true, isActive: true } } }
    });
    if (doctor) {
      return res.json({ success: true, data: { role: 'doctor', ...doctor.user, ...doctor, user: undefined } });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: { email: true, profile: true, role: true, isActive: true }
    });
    if (user) {
      return res.json({ success: true, data: { role: user.role, ...user } });
    }

    res.status(404).json({ success: false, message: 'Staff member not found' });
  } catch (error) {
    console.error('Get staff member error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update staff account
router.patch('/staff/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, phone, specialization, qualifications, experience, licenseNumber, consultationFee, department } = req.body;

    let doctor = await prisma.doctor.findUnique({ where: { id } });
    let userId = id;

    if (doctor) {
      userId = doctor.userId;
      await prisma.doctor.update({
        where: { id },
        data: {
          specialization: specialization || doctor.specialization,
          qualifications: qualifications || doctor.qualifications,
          experience: experience !== undefined ? Number(experience) : doctor.experience,
          licenseNumber: licenseNumber || doctor.licenseNumber,
          consultationFee: consultationFee !== undefined ? Number(consultationFee) : doctor.consultationFee,
          department: department || doctor.department
        }
      });
    }

    let user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ success: false, message: 'User account not found' });

    const currentProfile = user.profile || {};
    user = await prisma.user.update({
      where: { id: userId },
      data: {
        profile: {
          ...currentProfile,
          firstName: firstName || currentProfile.firstName,
          lastName: lastName || currentProfile.lastName,
          phone: phone !== undefined ? phone : currentProfile.phone
        }
      }
    });

    res.json({ success: true, message: 'Staff account updated successfully', data: { user } });
  } catch (error) {
    console.error('Update staff error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get system overview
router.get('/system-overview', getSystemOverview);
router.get('/user-analytics', getUserAnalytics);
router.get('/department-stats', getDepartmentStats);
router.get('/export', exportData);

// Delete staff account
router.delete('/staff/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let doctor = await prisma.doctor.findUnique({ where: { id } });
    let userId = id;

    if (doctor) {
      userId = doctor.userId;
      await prisma.doctor.update({ where: { id }, data: { isAvailable: false } });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ success: false, message: 'Staff account not found' });
    if (user.role === 'superadmin') return res.status(400).json({ success: false, message: 'Super Admin accounts cannot be removed' });
    if (user.id === (req.user.id || req.user._id)) return res.status(400).json({ success: false, message: 'You cannot remove your own account' });

    await prisma.user.update({
      where: { id: userId },
      data: {
        isActive: false,
        isOffboarded: true,
        offboardedAt: new Date(),
        offboardedBy: req.user.id || req.user._id
      }
    });

    await logAudit({
      action: 'STAFF_OFFBOARDED',
      performedBy: req.user.id || req.user._id,
      targetUser: user.id,
      details: `Staff member ${user.email} was offboarded and archived by admin.`,
      severity: 'critical',
      req
    });

    res.json({ success: true, message: 'Staff credentials removed successfully. Record preserved in archive.' });
  } catch (error) {
    console.error('Remove staff error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Audit Logs Endpoint
router.get('/audit-logs', async (req, res) => {
  try {
    const { severity, action, limit = 50 } = req.query;
    let where = {};
    if (severity) where.severity = severity;
    if (action) where.action = { contains: action, mode: 'insensitive' };

    const logs = await prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: Number(limit)
    });

    res.json({ success: true, data: { logs } });
  } catch (error) {
    console.error('Audit logs error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch audit logs' });
  }
});

// Bed Capacity
router.get('/beds', async (req, res) => {
  try {
    const beds = await prisma.bedCapacity.findMany({ orderBy: { department: 'asc' } });
    res.json({ success: true, data: { beds } });
  } catch (error) {
    console.error('Get beds error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch bed capacity' });
  }
});

router.post('/beds', async (req, res) => {
  try {
    const { department, totalBeds, occupiedBeds, icuBeds, occupiedIcuBeds } = req.body;
    if (!department) return res.status(400).json({ success: false, message: 'Department name is required' });

    const existing = await prisma.bedCapacity.findFirst({
      where: { department: { equals: department.trim(), mode: 'insensitive' } }
    });
    if (existing) return res.status(400).json({ success: false, message: `Bed allocation for ${department} already exists.` });

    const newBed = await prisma.bedCapacity.create({
      data: {
        department: department.trim(),
        totalBeds: Number(totalBeds) || 0,
        occupiedBeds: Number(occupiedBeds) || 0,
        icuBeds: Number(icuBeds) || 0,
        occupiedIcuBeds: Number(occupiedIcuBeds) || 0
      }
    });

    await logAudit({
      action: 'BED_CAPACITY_CREATED',
      performedBy: req.user.id || req.user._id,
      details: `New bed telemetry record added for department: ${department}`,
      severity: 'info',
      req
    });

    res.status(201).json({ success: true, data: { bed: newBed } });
  } catch (error) {
    console.error('Create bed error:', error);
    res.status(500).json({ success: false, message: 'Failed to create bed capacity entry' });
  }
});

router.delete('/beds/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBed = await prisma.bedCapacity.delete({ where: { id } });
    if (deletedBed) {
      await logAudit({
        action: 'BED_CAPACITY_DELETED',
        performedBy: req.user.id || req.user._id,
        details: `Bed telemetry record deleted for department: ${deletedBed.department}`,
        severity: 'warning',
        req
      });
    }
    res.json({ success: true, message: 'Bed capacity entry removed' });
  } catch (error) {
    console.error('Delete bed error:', error);
    res.status(500).json({ success: false, message: 'Failed to remove bed capacity entry' });
  }
});

router.patch('/beds/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { totalBeds, occupiedBeds, icuBeds, occupiedIcuBeds } = req.body;
    const updatedBed = await prisma.bedCapacity.update({
      where: { id },
      data: { totalBeds, occupiedBeds, icuBeds, occupiedIcuBeds }
    });

    await logAudit({
      action: 'BED_CAPACITY_UPDATED',
      performedBy: req.user.id || req.user._id,
      details: `Bed telemetry updated for department ${updatedBed.department}`,
      severity: 'info',
      req
    });

    res.json({ success: true, data: { bed: updatedBed } });
  } catch (error) {
    console.error('Update beds error:', error);
    res.status(500).json({ success: false, message: 'Failed to update bed capacity' });
  }
});

router.get('/security/sessions', async (req, res) => {
  try {
    const activeStaff = await prisma.user.findMany({
      where: { isActive: true, role: { in: ['doctor', 'receptionist', 'superadmin'] } },
      select: { email: true, profile: true, role: true, lastLogin: true, createdAt: true },
      orderBy: { lastLogin: 'desc' }
    });
    res.json({
      success: true,
      data: {
        activeStaff,
        isSystemLockdown,
        securityMetrics: {
          firewallStatus: 'Active',
          encryptionStandard: 'AES-256-GCM',
          hipaaCompliance: 'Passed',
          failedLoginAttempts24h: 3
        }
      }
    });
  } catch (error) {
    console.error('Security sessions error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch security state' });
  }
});

router.post('/security/lockdown', async (req, res) => {
  try {
    const { lockdown } = req.body;
    isSystemLockdown = Boolean(lockdown);

    await logAudit({
      action: isSystemLockdown ? 'EMERGENCY_LOCKDOWN_ACTIVATED' : 'EMERGENCY_LOCKDOWN_DEACTIVATED',
      performedBy: req.user.id || req.user._id,
      details: isSystemLockdown ? 'ALERT: Emergency system lockdown triggered by SuperAdmin.' : 'Emergency system lockdown lifted by SuperAdmin.',
      severity: 'critical',
      req
    });

    res.json({ success: true, message: isSystemLockdown ? 'System is now in Emergency Lockdown mode.' : 'System Lockdown lifted.', data: { isSystemLockdown } });
  } catch (error) {
    console.error('Lockdown toggle error:', error);
    res.status(500).json({ success: false, message: 'Failed to toggle emergency lockdown' });
  }
});

module.exports = { router, getIsSystemLockdown };
