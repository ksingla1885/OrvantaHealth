const mongoose = require('mongoose');
const User = require('./models/User');
const TriageRecord = require('./models/TriageRecord');
require('dotenv').config({ path: './.env' });

async function createPatientForKetan() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find receptionist user
    const receptionist = await User.findOne({ role: 'receptionist' }) || await User.findOne({});
    if (!receptionist) {
      console.error('No receptionist/user found to act as intake creator');
      process.exit(1);
    }

    // Find Doctor Ketan
    const doctor = await User.findOne({
      role: 'doctor',
      $or: [
        { 'profile.firstName': /ketan/i },
        { 'profile.lastName': /ketan/i },
        { 'email': /ketan/i }
      ]
    }) || await User.findOne({ role: 'doctor' });

    if (!doctor) {
      console.error('No doctor found in the database. Please create a doctor first.');
      process.exit(1);
    }

    console.log(`Found Doctor: ${doctor.profile?.firstName || ''} ${doctor.profile?.lastName || ''} (${doctor.email})`);

    const triageId = 'TRG-' + Date.now().toString().slice(-6);

    const newRecord = new TriageRecord({
      patientName: 'Marcus Brody',
      age: 45,
      gender: 'male',
      contactNumber: '+1 (555) 321-7788',
      symptoms: 'Chronic lower back pain radiating down to the left leg, numbness in the left toes, severe stiffness in the morning.',
      vitals: {
        temperature: '98.6',
        bloodPressure: '130/85',
        pulseRate: '80',
        spO2: '99%'
      },
      aiAnalysis: {
        urgencyLevel: 'Routine',
        riskScore: 4.2,
        possibleConditions: [
          'Lumbar Disc Herniation (L4-L5)',
          'Sciatica / Lumbar Radiculopathy',
          'Acute Lumbar Muscle Strain'
        ],
        reasoning: 'Symptoms suggest nerve root compression at the lumbar levels, radiating down the sciatic path. No red flags (like saddle anesthesia) present. Routine MRI/physiotherapy referral indicated.'
      },
      receptionistId: receptionist._id,
      doctorReferred: doctor._id,
      status: 'referred',
      triageId: triageId
    });

    await newRecord.save();
    console.log('✅ Patient Record Created Successfully for Doctor Ketan!');
    console.log(`- Patient Name: ${newRecord.patientName}`);
    console.log(`- Triage ID: ${newRecord.triageId}`);
    console.log(`- Urgency Level: ${newRecord.aiAnalysis.urgencyLevel}`);
    console.log(`- Assigned to: Dr. ${doctor.profile?.firstName} ${doctor.profile?.lastName}`);

    process.exit(0);
  } catch (err) {
    console.error('Error creating patient:', err);
    process.exit(1);
  }
}

createPatientForKetan();
