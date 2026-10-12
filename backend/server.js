const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const prisma = require('./prismaClient');
require('dotenv').config();

const app = express();

// Environment variables
const NODE_ENV = process.env.NODE_ENV || 'development';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3004',
  'http://localhost:3010',
  'http://localhost:5173',
  'https://orvanta-health.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean).map(origin => origin.replace(/\/$/, ''));


// CORS must be before Helmet to ensure headers are set correctly
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const normalizedOrigin = origin.replace(/\/$/, '');
    const isAllowed = allowedOrigins.includes(normalizedOrigin); // Removed Vercel wildcard
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`⚠️ CORS blocked for origin: ${origin}`);
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 204
}));


// Security middleware - configured for cross-origin use
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginPropertyPolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https://br-cold-voice-b304mec5.storage.c-4.ap-southeast-1.aws.neon.tech"],
      connectSrc: ["'self'", "https://api.razorpay.com"],
    },
  },
}));


// Enable trust proxy for rate limiting behind proxies
app.set('trust proxy', 1);

// Rate limiting - more lenient in development
const limiter = rateLimit({
  windowMs: NODE_ENV === 'production' ? 15 * 60 * 1000 : 15 * 60 * 1000, // 15 min window
  max: NODE_ENV === 'production' ? 1000 : 10000, // 1000 in prod, 10000 in dev
  message: 'Too many requests from this IP, please try again later.',
  skip: (req, res) => {
    // Skip rate limiting for health check, static files, and local development connections
    const isLocalhost = 
      req.ip === '127.0.0.1' || 
      req.ip === '::1' || 
      req.ip === '::ffff:127.0.0.1' || 
      req.headers.host?.includes('localhost') || 
      req.headers.host?.includes('127.0.0.1');
    return req.path === '/health' || req.path.startsWith('/uploads') || isLocalhost;
  }
});
app.use(limiter);

// Logging
if (NODE_ENV === 'production') {
  // app.use(morgan('combined'));
} else {
  // app.use(morgan('dev'));
}

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Static files for uploads
app.use('/uploads', express.static('uploads'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    environment: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Root endpoint for simple health check when visiting the URL
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'OrvantaHealth Backend API is successfully running on Vercel!',
    version: '1.0.0'
  });
});

// Database connection with retry mechanism for Neon compute cold-starts
async function connectWithRetry(retries = 5, delay = 2500) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await prisma.$connect();
      console.log('✓ Connected to Neon PostgreSQL via Prisma');
      return;
    } catch (err) {
      console.warn(`⚠️ Prisma connection attempt ${attempt}/${retries} failed: ${err.message}`);
      if (attempt < retries) {
        console.log(`Waiting ${delay / 1000}s for Neon database compute to resume...`);
        await new Promise(res => setTimeout(res, delay));
      } else {
        console.error('✗ Prisma connection error: Could not reach database after multiple attempts.');
        process.exit(1);
      }
    }
  }
}

connectWithRetry();

const adminModule = require('./routes/admin');
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', adminModule.router);
app.use('/api/doctor', require('./routes/doctor'));
app.use('/api/receptionist', require('./routes/receptionist'));
app.use('/api/patient', require('./routes/patient'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/chatbot', require('./routes/chatbot'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/triage', require('./routes/triage'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);

  // Don't expose error details in production
  const message = NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message;

  res.status(err.status || 500).json({
    success: false,
    message: message,
    ...(NODE_ENV !== 'production' && { error: err })
  });
});

const PORT = process.env.PORT || 5000;

// Export the app for Vercel
module.exports = app;

// Only listen if not running on Vercel
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const server = app.listen(PORT, () => {
    console.log(`
  ╔════════════════════════════════════════╗
  ║ OrvantaHealth Backend Server Running   ║
  ╠════════════════════════════════════════╣
  ║ Environment: ${NODE_ENV.toUpperCase().padEnd(29)} ║
  ║ Port: ${PORT.toString().padEnd(34)} ║
  ║ URL: ${(process.env.FRONTEND_URL || 'http://localhost:3000').padEnd(25)} ║
  ╚════════════════════════════════════════╝
    `);
  });

  const gracefulShutdown = (signal) => {
    console.log(`${signal} received. Shutting down gracefully...`);
    server.close(() => {
      console.log('Server closed');
      prisma.$disconnect().then(() => {
        console.log('Prisma connection closed');
        if (signal === 'SIGUSR2') {
          process.kill(process.pid, 'SIGUSR2');
        } else {
          process.exit(0);
        }
      });
    });

    // Force close server after 3 seconds
    setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 3000);
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2'));
}
