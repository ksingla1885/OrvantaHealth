const express = require('express');
const router = express.Router();
const TriageRecord = require('../models/TriageRecord');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const Groq = require('groq-sdk');

// AI Logic for Triage
const runAITriage = async (symptoms, age, gender) => {
  const apiKey = process.env.GROQ_API_KEY_PRIMARY || process.env.GROQ_API_KEY_BACKUP;
  if (!apiKey) {
    return {
      urgencyLevel: 'Routine',
      riskScore: 3,
      possibleConditions: ['Unable to analyze - AI key missing'],
      reasoning: 'AI diagnosis is currently unavailable.'
    };
  }

  const groq = new Groq({ apiKey });
  const systemPrompt = `You are a highly experienced Medical Triage Assistant. 
Analyze the following patient symptoms and provide:
1. Urgency Level: Must be one of ['Routine', 'Urgent', 'Emergency']
2. Risk Score: 0 to 10 (Float)
3. Possible Conditions: A list of 2-4 possible medical conditions.
4. Reasoning: A brief 2-sentence explanation.

RETURN ONLY A VALID JSON OBJECT.
JSON Format:
{
  "urgencyLevel": "...",
  "riskScore": ...,
  "possibleConditions": ["...", "..."],
  "reasoning": "..."
}`;

  const userPrompt = `Patient: ${gender}, Age: ${age}. Symptoms: ${symptoms}`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.1,
      max_tokens: 500,
      response_format: { type: "json_object" }
    });

    return JSON.parse(chatCompletion.choices[0]?.message?.content);
  } catch (error) {
    console.error('AI Triage Error:', error);
    return {
      urgencyLevel: 'Routine',
      riskScore: 5,
      possibleConditions: ['Error during AI analysis'],
      reasoning: 'An error occurred while processing the symptoms.'
    };
  }
};

// 1. Patient Intake - Create Triage Record
router.post('/intake', authenticateToken, authorizeRoles('receptionist', 'superadmin'), async (req, res) => {
  try {
    const { patientName, age, gender, contactNumber, symptoms, vitals } = req.body;
    
    // Generate unique Triage ID
    const triageId = 'TRG-' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);
    
    // Run AI Analysis
    const aiAnalysis = await runAITriage(symptoms, age, gender);

    const newRecord = new TriageRecord({
      patientName,
      age,
      gender,
      contactNumber,
      symptoms,
      vitals,
      aiAnalysis,
      receptionistId: req.user.id,
      triageId
    });

    await newRecord.save();

    res.status(201).json({
      success: true,
      message: 'Triage intake completed',
      data: { triage: newRecord }
    });
  } catch (error) {
    console.error('Triage intake failed:', error);
    res.status(500).json({ success: false, message: 'Intake failed. Please check inputs.' });
  }
});

// 2. Get Triage Queue (Pending or Resolved)
router.get('/queue', authenticateToken, async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status === 'resolved') {
        query.status = 'resolved';
        // If doctor, they only see THEIR resolved patients
        if (req.user.role === 'doctor') {
            query.doctorReferred = req.user.id;
        }
    } else {
        // If doctor, they see THEIR active patients (referred, in-consultation, or completed)
        if (req.user.role === 'doctor') {
            query.status = { $in: ['referred', 'in-consultation', 'completed'] };
            query.doctorReferred = req.user.id;
        } else {
            // Receptionists/Admins see the general lobby (all except resolved)
            query.status = { $in: ['pending', 'referred', 'in-consultation', 'completed'] };
        }
    }

    const queue = await TriageRecord.find(query)
      .populate('doctorReferred', 'profile')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, data: { queue } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch queue' });
  }
});

// 3. Get Triage Records Referred to Doctor
router.get('/doctor/referred', authenticateToken, authorizeRoles('doctor'), async (req, res) => {
  try {
    const referred = await TriageRecord.find({ 
      doctorReferred: req.user.id,
      status: { $in: ['referred', 'in-consultation', 'completed'] }
    }).sort({ createdAt: -1 });
    
    res.json({ success: true, data: { referred } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch referrals' });
  }
});

// 3. Prescribe Medicine in Triage (Walk-in workflow)
router.post('/prescribe/:id', authenticateToken, async (req, res) => {
  try {
    const { medicines, diagnosis, tests, advice, followUpDate } = req.body;
    const triageRecord = await TriageRecord.findById(req.params.id);

    if (!triageRecord) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    triageRecord.prescribedMedicines = medicines;
    triageRecord.diagnosis = diagnosis;
    triageRecord.tests = tests;
    triageRecord.advice = advice;
    triageRecord.followUpDate = followUpDate;
    
    triageRecord.status = 'resolved';
    triageRecord.resolvedAt = new Date();
    
    await triageRecord.save();

    res.json({
      success: true,
      message: 'Prescription associated and triage record closed',
      data: { triage: triageRecord }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update record' });
  }
});

// 4. Refer to Doctor
router.post('/refer/:id', authenticateToken, authorizeRoles('receptionist', 'superadmin'), async (req, res) => {
  try {
    const { doctorId } = req.body;
    const triageRecord = await TriageRecord.findById(req.params.id);

    if (!triageRecord) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    triageRecord.doctorReferred = doctorId;
    triageRecord.status = 'referred';
    
    await triageRecord.save();

    res.json({
      success: true,
      message: 'Patient referred successfully',
      data: { triage: triageRecord }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to refer to doctor' });
  }
});

// 6. Check-In (Doctor starts session)
router.post('/check-in/:id', authenticateToken, authorizeRoles('doctor'), async (req, res) => {
  try {
    const record = await TriageRecord.findById(req.params.id);
    if (!record) return res.status(404).json({ success: false, message: 'Record not found' });
    
    record.status = 'in-consultation';
    record.checkedInAt = new Date();
    await record.save();
    
    res.json({ success: true, message: 'Patient checked-in successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Check-in failed' });
  }
});

// 7. Check-Out (Doctor finishes session)
router.post('/check-out/:id', authenticateToken, authorizeRoles('doctor'), async (req, res) => {
  try {
    const record = await TriageRecord.findById(req.params.id);
    if (!record) return res.status(404).json({ success: false, message: 'Record not found' });
    
    record.status = 'completed';
    record.checkedOutAt = new Date();
    await record.save();
    
    res.json({ success: true, message: 'Patient checked-out successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Check-out failed' });
  }
});

module.exports = router;
