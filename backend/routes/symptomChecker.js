const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const rateLimit = require('express-rate-limit');
const TriageRecord = require('../models/TriageRecord');

// Rate limiting for AI endpoint
const triageLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
  message: { success: false, message: 'Too many requests. Please wait a moment before trying again.' }
});

// ── Helper: call Groq AI and return structured triage JSON ────────────────────
const callGroqForTriage = async (payload, apiKey) => {
  const Groq = require('groq-sdk');
  const groq = new Groq({ apiKey });

  const { symptoms, vitals, painLevel, additionalInfo } = payload;

  const userMessage = `
Patient Triage Request:
- Symptoms: ${symptoms.join(', ') || 'Not specified'}
- Pain Level: ${painLevel}/10
- Vitals:
    Blood Pressure: ${vitals.bloodPressure || 'Not measured'}
    Temperature: ${vitals.temperature ? vitals.temperature + '°F' : 'Not measured'}
    Heart Rate: ${vitals.heartRate ? vitals.heartRate + ' bpm' : 'Not measured'}
    Oxygen Saturation (SpO2): ${vitals.oxygenSaturation ? vitals.oxygenSaturation + '%' : 'Not measured'}
    Respiratory Rate: ${vitals.respiratoryRate ? vitals.respiratoryRate + ' breaths/min' : 'Not measured'}
- Patient Age: ${additionalInfo?.age || 'Unknown'}
- Gender: ${additionalInfo?.gender || 'Unknown'}
- Duration of symptoms: ${additionalInfo?.duration || 'Unknown'}
- Relevant medical history: ${additionalInfo?.medicalHistory || 'None'}
  `.trim();

  const systemPrompt = `You are an expert medical triage AI for OrvantaHealth Hospital Management System.
Analyze the patient's symptoms, vitals, and pain level and respond ONLY with a valid JSON object (no markdown, no explanation outside JSON).

Use this exact JSON structure:
{
  "urgencyLevel": "HIGH" | "MEDIUM" | "LOW",
  "urgencyReason": "Brief 1-2 sentence explanation of why this urgency level was chosen",
  "riskScore": <integer 0-100>,
  "possibleConditions": [
    { "name": "<condition name>", "probability": "HIGH" | "MEDIUM" | "LOW", "description": "<one line description>" }
  ],
  "recommendedDepartment": "<department name, e.g. Emergency, Cardiology, General OPD, Neurology, etc.>",
  "recommendedAction": "<specific next step for the patient>",
  "warningFlags": ["<flag 1>", "<flag 2>"],
  "disclaimer": "I am an AI assistant. This is not a medical diagnosis. Please consult a qualified healthcare professional."
}

Scoring guide:
- riskScore 75-100 → urgencyLevel: HIGH (requires emergency/immediate care)
- riskScore 40-74  → urgencyLevel: MEDIUM (requires specialist consultation within 24h)
- riskScore 0-39   → urgencyLevel: LOW (general OPD, can wait)

List 2-4 possible conditions ordered by probability. Be clinically accurate and compassionate.
Respond ONLY with the JSON object, nothing else.`;

  const completion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.2,
    max_tokens: 800,
    response_format: { type: 'json_object' }
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) throw new Error('Empty response from AI');

  const parsed = JSON.parse(raw);
  // Validate required fields
  if (!parsed.urgencyLevel || !parsed.riskScore === undefined || !parsed.recommendedDepartment) {
    throw new Error('AI returned incomplete triage data');
  }
  return parsed;
};

// ── POST /api/symptom-check/analyze ──────────────────────────────────────────
// Public endpoint (no auth required so patients can use the checker before login)
router.post(
  '/analyze',
  [
    body('symptoms').isArray({ min: 1 }).withMessage('At least one symptom is required'),
    body('painLevel').isFloat({ min: 0, max: 10 }).withMessage('Pain level must be 0-10'),
    body('vitals').optional().isObject(),
    body('additionalInfo').optional().isObject()
  ],
  triageLimiter,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: 'Validation error', errors: errors.array() });
      }

      const { symptoms, vitals = {}, painLevel, additionalInfo = {} } = req.body;

      let aiAnalysis;
      // Try primary key, fall back to backup
      try {
        aiAnalysis = await callGroqForTriage({ symptoms, vitals, painLevel, additionalInfo }, process.env.GROQ_API_KEY_PRIMARY);
      } catch (primaryErr) {
        console.error('Primary Groq key failed for triage:', primaryErr.message);
        if (process.env.GROQ_API_KEY_BACKUP) {
          aiAnalysis = await callGroqForTriage({ symptoms, vitals, painLevel, additionalInfo }, process.env.GROQ_API_KEY_BACKUP);
        } else {
          throw primaryErr;
        }
      }

      // Save record to MongoDB
      const record = new TriageRecord({
        userId: req.user?._id || null,
        symptoms,
        vitals,
        painLevel,
        additionalInfo,
        aiAnalysis
      });
      await record.save();

      return res.status(201).json({
        success: true,
        message: 'Triage analysis complete',
        data: {
          recordId: record._id,
          analysis: aiAnalysis,
          checkedAt: record.createdAt
        }
      });
    } catch (error) {
      console.error('Symptom checker error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to analyze symptoms. Please try again or contact the hospital directly.'
      });
    }
  }
);

// ── GET /api/symptom-check/queue ──────────────────────────────────────────────
// Doctor/Admin triage queue — sorted by risk score descending
router.get(
  '/queue',
  authenticateToken,
  authorizeRoles('doctor', 'superadmin', 'receptionist'),
  async (req, res) => {
    try {
      const { urgency, status = 'pending', limit = 50 } = req.query;

      const query = {};
      if (status) query.status = status;
      if (urgency) query['aiAnalysis.urgencyLevel'] = urgency.toUpperCase();

      const records = await TriageRecord.find(query)
        .populate('userId', 'profile email phone')
        .populate('reviewedBy', 'profile')
        .sort({ 'aiAnalysis.riskScore': -1, createdAt: -1 })
        .limit(parseInt(limit));

      const summary = {
        high: await TriageRecord.countDocuments({ 'aiAnalysis.urgencyLevel': 'HIGH', status: 'pending' }),
        medium: await TriageRecord.countDocuments({ 'aiAnalysis.urgencyLevel': 'MEDIUM', status: 'pending' }),
        low: await TriageRecord.countDocuments({ 'aiAnalysis.urgencyLevel': 'LOW', status: 'pending' }),
        total: await TriageRecord.countDocuments({ status: 'pending' })
      };

      return res.json({
        success: true,
        data: { records, summary }
      });
    } catch (error) {
      console.error('Triage queue error:', error);
      return res.status(500).json({ success: false, message: 'Server error fetching triage queue' });
    }
  }
);

// ── GET /api/symptom-check/my-history ─────────────────────────────────────────
// Patient views their own triage history
router.get('/my-history', authenticateToken, authorizeRoles('patient'), async (req, res) => {
  try {
    const records = await TriageRecord.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);

    return res.json({ success: true, data: { records } });
  } catch (error) {
    console.error('Triage history error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching history' });
  }
});

// ── PATCH /api/symptom-check/:recordId/review ─────────────────────────────────
// Doctor reviews/updates a triage record
router.patch(
  '/:recordId/review',
  [
    body('status').isIn(['reviewed', 'escalated', 'resolved']),
    body('reviewNotes').optional().isString().trim()
  ],
  authenticateToken,
  authorizeRoles('doctor', 'superadmin', 'receptionist'),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { recordId } = req.params;
      const { status, reviewNotes } = req.body;

      const record = await TriageRecord.findByIdAndUpdate(
        recordId,
        { status, reviewNotes, reviewedBy: req.user._id },
        { new: true }
      ).populate('userId', 'profile email');

      if (!record) {
        return res.status(404).json({ success: false, message: 'Triage record not found' });
      }

      return res.json({ success: true, message: `Triage record marked as ${status}`, data: { record } });
    } catch (error) {
      console.error('Review triage error:', error);
      return res.status(500).json({ success: false, message: 'Server error updating triage record' });
    }
  }
);

// ── POST /api/symptom-check/:recordId/prescribe ───────────────────────────────
// Doctor prescribes medicine from the triage queue (walk-in patient, no appointmentId needed)
router.post(
  '/:recordId/prescribe',
  [
    body('diagnosis').notEmpty().trim().withMessage('Diagnosis is required'),
    body('medicines').isArray({ min: 1 }).withMessage('At least one medicine is required'),
    body('medicines.*.name').notEmpty().trim(),
    body('medicines.*.dosage').notEmpty().trim(),
    body('medicines.*.frequency').notEmpty().trim(),
    body('medicines.*.duration').notEmpty().trim()
  ],
  authenticateToken,
  authorizeRoles('doctor', 'superadmin'),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { recordId } = req.params;
      const { diagnosis, medicines, tests, advice, followUpDate } = req.body;

      // Fetch the triage record
      const triageRecord = await TriageRecord.findById(recordId);
      if (!triageRecord) {
        return res.status(404).json({ success: false, message: 'Triage record not found' });
      }

      // Get the doctor profile
      const Doctor = require('../models/Doctor');
      const doctor = await Doctor.findOne({ userId: req.user._id });
      if (!doctor) {
        return res.status(404).json({ success: false, message: 'Doctor profile not found' });
      }

      const Prescription = require('../models/Prescription');

      // Create prescription linked to triage record (no appointmentId for walk-in)
      const prescription = new Prescription({
        triageRecordId: triageRecord._id,
        patientId: triageRecord.userId ? undefined : undefined, // may be null for walk-in
        patientName: triageRecord.additionalInfo?.patientName ||
          (triageRecord.userId ? undefined : 'Walk-in Patient'),
        doctorId: doctor._id,
        diagnosis,
        medicines,
        tests: tests || [],
        advice,
        followUpDate: followUpDate ? new Date(followUpDate) : undefined
      });

      await prescription.save();

      // Link prescription back to the triage record & mark as resolved
      triageRecord.prescription = prescription._id;
      triageRecord.status = 'resolved';
      triageRecord.reviewedBy = req.user._id;
      triageRecord.reviewNotes = (triageRecord.reviewNotes || '') + `\nPrescription issued. Diagnosis: ${diagnosis}`;
      await triageRecord.save();

      // Populate for response
      await prescription.populate({ path: 'doctorId', populate: { path: 'userId', select: 'profile' } });

      return res.status(201).json({
        success: true,
        message: 'Prescription issued successfully',
        data: { prescription }
      });
    } catch (error) {
      console.error('Triage prescribe error:', error);
      return res.status(500).json({ success: false, message: 'Server error issuing prescription' });
    }
  }
);

module.exports = router;
