const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

// Rate limiting for chatbot
const chatbotLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests. Please try again later.'
  }
});

// Health-related keywords for content filtering
const healthKeywords = [
  'health', 'medical', 'doctor', 'medicine', 'hospital', 'clinic', 'treatment',
  'diagnosis', 'symptom', 'disease', 'condition', 'pain', 'fever', 'cough',
  'headache', 'blood pressure', 'diabetes', 'cancer', 'heart', 'lungs',
  'prescription', 'drug', 'medication', 'therapy', 'surgery', 'test',
  'lab', 'x-ray', 'mri', 'checkup', 'vaccination', 'immunity', 'allergy',
  'nutrition', 'diet', 'exercise', 'fitness', 'mental health', 'stress',
  'anxiety', 'depression', 'sleep', 'weight', 'obesity', 'cholesterol',
  'first aid', 'emergency', 'ambulance', 'pharmacy', 'nurse', 'specialist'
];

// Check if query is health-related
const isHealthRelated = (query) => {
  const lowerQuery = query.toLowerCase();
  return healthKeywords.some(keyword => lowerQuery.includes(keyword));
};

// Generate response using Groq API
const generateGroqResponse = async (query, apiKey) => {
  const Groq = require('groq-sdk');
  const groq = new Groq({ apiKey });

  const systemPrompt = `You are a helpful medical assistant chatbot for MediCore Hospital Management System. 
  Your role is to provide general health information and guidance only. 
  Always include the following disclaimer: "I am an AI assistant and not a medical professional. Please consult with a qualified healthcare provider for medical advice, diagnosis, or treatment."
  
  Guidelines:
  - Only answer health, medical, and healthcare-related questions
  - Provide general information, not specific medical advice
  - Always recommend consulting healthcare professionals for specific concerns
  - Be empathetic and professional
  - If asked about non-medical topics, politely decline and say you can only help with healthcare-related topics
  - Never provide emergency medical advice - always direct to emergency services for urgent situations
  
  User Query: ${query}`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: query
        }
      ],
      model: "llama2-70b-4096",
      temperature: 0.5,
      max_tokens: 500
    });

    return chatCompletion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error('Groq API error:', error);
    throw error;
  }
};

// Chatbot endpoint
router.post('/chat', [
  body('message').notEmpty().trim().isLength({ max: 500 })
], authenticateToken, chatbotLimiter, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { message } = req.body;

    // Check if message is health-related
    if (!isHealthRelated(message)) {
      return res.json({
        success: true,
        data: {
          response: "I am restricted to healthcare-related topics only. Please ask me questions about health, medical conditions, doctors, medicines, or hospital-related topics.",
          isHealthRelated: false
        }
      });
    }

    let response;
    let usedBackupKey = false;

    // Try primary API key first
    try {
      response = await generateGroqResponse(message, process.env.GROQ_API_KEY_PRIMARY);
    } catch (primaryError) {
      console.error('Primary Groq API failed:', primaryError);
      
      // Try backup API key
      try {
        if (process.env.GROQ_API_KEY_BACKUP) {
          response = await generateGroqResponse(message, process.env.GROQ_API_KEY_BACKUP);
          usedBackupKey = true;
        } else {
          throw new Error('Backup API key not configured');
        }
      } catch (backupError) {
        console.error('Backup Groq API also failed:', backupError);
        return res.status(503).json({
          success: false,
          message: 'Chatbot service is temporarily unavailable. Please try again later.'
        });
      }
    }

    res.json({
      success: true,
      data: {
        response,
        isHealthRelated: true,
        usedBackupKey
      }
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error processing your request'
    });
  }
});

// Get chatbot status
router.get('/status', authenticateToken, async (req, res) => {
  try {
    const status = {
      isAvailable: !!(process.env.GROQ_API_KEY_PRIMARY || process.env.GROQ_API_KEY_BACKUP),
      hasPrimaryKey: !!process.env.GROQ_API_KEY_PRIMARY,
      hasBackupKey: !!process.env.GROQ_API_KEY_BACKUP,
      rateLimit: {
        windowMs: 60000, // 1 minute
        maxRequests: 10
      }
    };

    res.json({
      success: true,
      data: { status }
    });
  } catch (error) {
    console.error('Chatbot status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get health topics suggestions
router.get('/topics', authenticateToken, async (req, res) => {
  try {
    const topics = [
      "General health and wellness",
      "Common symptoms and when to see a doctor",
      "Preventive care and checkups",
      "Medication information",
      "Mental health awareness",
      "Nutrition and diet advice",
      "Exercise and fitness",
      "Chronic disease management",
      "First aid and emergency care",
      "Women's health",
      "Children's health",
      "Elderly care"
    ];

    res.json({
      success: true,
      data: { topics }
    });
  } catch (error) {
    console.error('Get topics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
