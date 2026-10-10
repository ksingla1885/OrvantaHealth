const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const prisma = require('../prismaClient');

// AI Logic for Triage
const runAITriage = async (symptoms, age, gender) => {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return {
      urgencyLevel: 'Routine',
      riskScore: 3,
      possibleConditions: ['Unable to analyze - AI key missing'],
      reasoning: 'AI diagnosis is currently unavailable.'
    };
  }

  const { OpenRouter } = await import('@openrouter/sdk');
  const openrouter = new OpenRouter({ apiKey });
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
    const response = await openrouter.chat.send({
      chatRequest: {
        model: process.env.OPENROUTER_MODEL || "poolside/laguna-s-2.1:free",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.1,
        max_tokens: 500,
        response_format: { type: "json_object" }
      }
    });

    return JSON.parse(response.choices[0]?.message?.content);
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
    const { patientName, age, gender, contactNumber, symptoms, vitals, patientId } = req.body;
    const userId = req.user.id || req.user._id;
    
    // Generate unique Triage ID
    const triageId = 'TRG-' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);
    
    // Run AI Analysis
    const aiAnalysis = await runAITriage(symptoms, age, gender);

    // Resolve patientId automatically if not passed
    let resolvedPatientId = patientId || null;
    
    if (!resolvedPatientId && contactNumber) {
      const cleanPhone = contactNumber.replace(/\D/g, '');
      if (cleanPhone && cleanPhone.length >= 10) {
        const matchingUsers = await prisma.user.findMany({
          where: {
            role: 'patient',
            profile: { path: ['phone'], string_contains: cleanPhone.slice(-10) }
          }
        });
        
        if (matchingUsers.length > 0) {
          const patient = await prisma.patient.findUnique({ where: { userId: matchingUsers[0].id } });
          if (patient) resolvedPatientId = patient.id;
        }
      }
    }

    // Fallback: match by name if still not resolved
    if (!resolvedPatientId && patientName) {
      const nameParts = patientName.trim().split(/\s+/);
      const firstName = nameParts[0];
      // simplified name match for Prisma
      const matchingUsers = await prisma.user.findMany({
        where: {
          role: 'patient',
          profile: { path: ['firstName'], string_contains: firstName }
        }
      });
      if (matchingUsers.length > 0) {
        const patient = await prisma.patient.findUnique({ where: { userId: matchingUsers[0].id } });
        if (patient) resolvedPatientId = patient.id;
      }
    }

    const newRecord = await prisma.triageRecord.create({
      data: {
        patientName,
        age: parseInt(age) || 0,
        gender,
        contactNumber,
        symptoms,
        vitals: vitals || {},
        aiAnalysis: aiAnalysis || {},
        receptionistId: userId,
        triageId,
        patientId: resolvedPatientId
      }
    });

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
    const userId = req.user.id || req.user._id;
    let query = {};
    
    if (status === 'resolved') {
        if (req.user.role === 'receptionist') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Patient history is restricted to clinical staff.'
            });
        }
        
        query.status = 'resolved';
        if (req.user.role === 'doctor') {
            query.doctorReferredId = userId;
        }
    } else {
        if (req.user.role === 'doctor') {
            query.status = { in: ['referred', 'in-consultation', 'completed'] };
            query.doctorReferredId = userId;
        } else {
            query.status = { in: ['pending', 'referred', 'in-consultation', 'completed'] };
        }
    }

    const queue = await prisma.triageRecord.findMany({
      where: query,
      include: {
        doctorReferred: { select: { profile: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json({ success: true, data: { queue } });
  } catch (error) {
    console.error('Fetch queue error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch queue' });
  }
});

// 3. Get Triage Records Referred to Doctor
router.get('/doctor/referred', authenticateToken, authorizeRoles('doctor'), async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const referred = await prisma.triageRecord.findMany({
      where: {
        doctorReferredId: userId,
        status: { in: ['referred', 'in-consultation', 'completed'] }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json({ success: true, data: { referred } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch referrals' });
  }
});

// 3. Prescribe Medicine in Triage (Walk-in workflow)
router.post('/prescribe/:id', authenticateToken, async (req, res) => {
  try {
    const { medicines, diagnosis, tests, advice, followUpDate } = req.body;
    const { id } = req.params;
    const userId = req.user.id || req.user._id;

    const triageRecord = await prisma.triageRecord.findUnique({ where: { id } });

    if (!triageRecord) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    let updateData = {
      prescribedMedicines: medicines || [],
      diagnosis,
      tests: tests || [],
      advice,
      followUpDate: followUpDate ? new Date(followUpDate) : null,
      status: 'resolved',
      resolvedAt: new Date()
    };
    
    if (req.user.role === 'doctor') {
      updateData.doctorReferredId = userId;
    }
    
    const updatedRecord = await prisma.triageRecord.update({
      where: { id },
      data: updateData
    });

    res.json({
      success: true,
      message: 'Prescription associated and triage record closed',
      data: { triage: updatedRecord }
    });
  } catch (error) {
    console.error('Prescribe triage error:', error);
    res.status(500).json({ success: false, message: 'Failed to update record' });
  }
});

// 4. Refer to Doctor
router.post('/refer/:id', authenticateToken, authorizeRoles('receptionist', 'superadmin'), async (req, res) => {
  try {
    const { doctorId } = req.body;
    const { id } = req.params;

    const triageRecord = await prisma.triageRecord.findUnique({ where: { id } });

    if (!triageRecord) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    // doctorId coming from frontend might be User ID of doctor or Doctor ID
    // Let's assume it's User ID since TriageRecord references User
    const updatedRecord = await prisma.triageRecord.update({
      where: { id },
      data: {
        doctorReferredId: doctorId,
        status: 'referred'
      }
    });

    res.json({
      success: true,
      message: 'Patient referred successfully',
      data: { triage: updatedRecord }
    });
  } catch (error) {
    console.error('Refer to doctor error:', error);
    res.status(500).json({ success: false, message: 'Failed to refer to doctor' });
  }
});

// 6. Check-In (Doctor starts session)
router.post('/check-in/:id', authenticateToken, authorizeRoles('doctor', 'receptionist', 'superadmin'), async (req, res) => {
  try {
    const { id } = req.params;
    const record = await prisma.triageRecord.findUnique({ where: { id } });
    if (!record) return res.status(404).json({ success: false, message: 'Record not found' });
    
    await prisma.triageRecord.update({
      where: { id },
      data: {
        status: 'in-consultation',
        checkedInAt: new Date()
      }
    });
    
    res.json({ success: true, message: 'Patient checked-in successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Check-in failed' });
  }
});

// 7. Check-Out (Doctor finishes session)
router.post('/check-out/:id', authenticateToken, authorizeRoles('doctor', 'receptionist', 'superadmin'), async (req, res) => {
  try {
    const { id } = req.params;
    const record = await prisma.triageRecord.findUnique({ where: { id } });
    if (!record) return res.status(404).json({ success: false, message: 'Record not found' });
    
    await prisma.triageRecord.update({
      where: { id },
      data: {
        status: 'completed',
        checkedOutAt: new Date()
      }
    });
    
    res.json({ success: true, message: 'Patient checked-out successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Check-out failed' });
  }
});

module.exports = router;
