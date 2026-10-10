const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const prisma = require('../prismaClient');
const bcrypt = require('bcryptjs');
const { generateTokens, verifyRefreshToken } = require('../utils/jwtUtils');
const { authenticateToken } = require('../middleware/auth');
const multer = require('multer');
const { profilePicStorage } = require('../config/s3Storage');

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'none'
};

const accessCookieOptions = {
  ...cookieOptions,
  maxAge: 15 * 60 * 1000 // 15 minutes
};

const refreshCookieOptions = {
  ...cookieOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

const upload = multer({
  storage: profilePicStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Test route
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Auth route is working',
    timestamp: new Date().toISOString()
  });
});

// Create superadmin (for testing)
router.post('/create-superadmin', async (req, res) => {
  try {
    const adminEmail = 'admin@orvantahealth.com';
    const adminPassword = 'Welcomeadmin';

    // Check if admin exists
    const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (existingAdmin) {
      return res.json({
        success: true,
        message: 'Superadmin already exists',
        data: {
          email: adminEmail,
          role: existingAdmin.role,
          isActive: existingAdmin.isActive
        }
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Create new admin
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        role: 'superadmin',
        profile: {
          firstName: 'Super',
          lastName: 'Admin',
          phone: '1234567890',
          gender: 'other',
          address: 'Hospital HQ'
        },
        isActive: true
      }
    });

    res.json({
      success: true,
      message: 'Superadmin created successfully',
      data: {
        email: adminEmail,
        password: adminPassword
      }
    });
  } catch (error) {
    console.error('Create superadmin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating superadmin',
      error: error.message
    });
  }
});

// Register new patient (public signup)
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('firstName').notEmpty().trim(),
  body('lastName').notEmpty().trim(),
  body('phone').optional(),
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

    const { email, password, firstName, lastName, phone, dateOfBirth, gender, address } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role: 'patient',
          profile: {
            firstName,
            lastName,
            phone: phone || undefined,
            dateOfBirth: dateOfBirth || undefined,
            gender: gender || undefined,
            address: address || undefined
          }
        }
      });

      // Create patient profile
      const patient = await prisma.patient.create({
        data: { userId: user.id, medicalRecordNumber: `MRN-${Math.floor(100000 + Math.random() * 900000)}`, medicalHistory: [], allergies: [], medications: [], emergencyContact: {}, insuranceInfo: {} }
      });

      // Generate tokens
      const tokens = generateTokens(user.id);

      // Save refresh token to user
      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: tokens.refreshToken }
      });

      res.cookie('accessToken', tokens.accessToken, accessCookieOptions);
      res.cookie('refreshToken', tokens.refreshToken, refreshCookieOptions);

      res.status(201).json({
        success: true,
        message: 'Patient registered successfully',
        data: {
          user
        }
      });
    } catch (saveError) {
      console.error(saveError);
      throw saveError;
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

const rateLimit = require('express-rate-limit');

// Strict rate limiter for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: { success: false, message: 'Too many login attempts, please try again after 15 minutes' }
});

// Login
router.post('/login', loginLimiter, [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
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

    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials or account not active'
      });
    }

    // Check if system is in Emergency Lockdown mode
    const { getIsSystemLockdown } = require('./admin');
    if (getIsSystemLockdown && getIsSystemLockdown() && user.role !== 'superadmin') {
      return res.status(403).json({
        success: false,
        message: 'System is currently in Emergency Lockdown. Logins for non-superadmin accounts are restricted by Administration.'
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate tokens
    const tokens = generateTokens(user.id);

    // Update last login and refresh token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLogin: new Date(),
        refreshToken: tokens.refreshToken
      }
    });

    res.cookie('accessToken', tokens.accessToken, accessCookieOptions);
    res.cookie('refreshToken', tokens.refreshToken, refreshCookieOptions);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// Refresh token
router.post('/refresh', async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token required'
      });
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Find user
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user || !user.isActive || user.refreshToken !== refreshToken) {
      return res.status(403).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }

    // Generate new tokens
    const tokens = generateTokens(user.id);

    // Update refresh token
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken }
    });

    res.cookie('accessToken', tokens.accessToken, accessCookieOptions);
    res.cookie('refreshToken', tokens.refreshToken, refreshCookieOptions);

    res.json({
      success: true,
      message: 'Token refreshed successfully'
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(403).json({
      success: false,
      message: 'Invalid refresh token'
    });
  }
});

// Logout
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // Remove refresh token from user
    await prisma.user.update({
      where: { id: req.user.id || req.user._id },
      data: { refreshToken: null }
    });

    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);

    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during logout'
    });
  }
});

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
  try {
    let profileData = null;
    const userId = req.user.id || req.user._id;

    // Get additional profile data based on role
    if (req.user.role === 'patient') {
      profileData = await prisma.patient.findUnique({ where: { userId: userId } });
    } else if (req.user.role === 'doctor') {
      profileData = await prisma.doctor.findUnique({ 
        where: { userId: userId },
        include: { user: { select: { email: true, profile: true } } }
      });
    }

    res.json({
      success: true,
      data: {
        user: req.user,
        profile: profileData
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Update user profile - for staff members (date of birth, gender, address)
router.patch('/profile', authenticateToken, async (req, res) => {
  try {
    const { dateOfBirth, gender, address } = req.body;
    const userId = req.user.id || req.user._id;

    const existingUser = await prisma.user.findUnique({ where: { id: userId } });
    let profile = (existingUser.profile) || {};
    if (dateOfBirth) profile.dateOfBirth = dateOfBirth;
    if (gender) profile.gender = gender;
    if (address) profile.address = address;

    const user = await prisma.user.update({
      where: { id: userId },
      data: { profile }
    });
    
    const { password, refreshToken, ...userWithoutSensitiveData } = user;

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user: userWithoutSensitiveData }
    });
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating profile'
    });
  }
});

// Upload profile picture (avatar)
router.post('/profile/avatar', authenticateToken, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const userId = req.user.id || req.user._id;
    const existingUser = await prisma.user.findUnique({ where: { id: userId } });
    
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    let profile = (existingUser.profile) || {};
    profile.avatar = req.file.path;

    const user = await prisma.user.update({
      where: { id: userId },
      data: { profile }
    });

    res.json({
      success: true,
      message: 'Profile picture updated successfully',
      data: {
        avatar: req.file.path,
        user
      }
    });
  } catch (error) {
    console.error('Avatar upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error uploading profile picture'
    });
  }
});

module.exports = router;
