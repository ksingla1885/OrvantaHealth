const mongoose = require('mongoose');
const User = require('./models/User');
const TriageRecord = require('./models/TriageRecord');
require('dotenv').config({ path: './.env' });

async function createEmergencyPatient() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find a receptionist and doctor user to assign
    const receptionist = await User.findOne({ role: 'receptionist' }) || await User.findOne({});
    const doctors = await User.find({ role: 'doctor' });

    if (!receptionist) {
      console.error('No receptionist/user found to act as intake creator');
      process.exit(1);
    }

    console.log(`Found ${doctors.length} doctor(s) in database`);

    const triageId = 'TRG-' + Date.now().toString().slice(-6);

    // Create Emergency Triage Record assigned to first doctor if available
    const emergencyRecord = new TriageRecord({
      patientName: 'Robert Vance (CRITICAL)',
      age: 59,
      gender: 'male',
      contactNumber: '+1 (555) 911-9900',
      symptoms: 'Acute crushing substernal chest pain radiating to left arm & jaw, severe dyspnea, diaphoresis, hyperthermia (102.4°F), blood pressure 170/110 mmHg.',
      vitals: {
        temperature: '102.4',
        bloodPressure: '170/110',
        pulseRate: '118',
        spO2: '90%'
      },
      aiAnalysis: {
        urgencyLevel: 'Emergency',
        riskScore: 9.8,
        possibleConditions: [
          'Acute ST-Elevation Myocardial Infarction (STEMI)',
          'Severe Septic Shock',
          'Aortic Dissection',
          'Acute Cardiac Failure'
        ],
        reasoning: 'Patient exhibits classic high-risk markers for STEMI with elevated fever (102.4°F) and acute hypoxia. Mandatory immediate clinical resuscitation.'
      },
      receptionistId: receptionist._id,
      doctorReferred: doctors.length > 0 ? doctors[0]._id : null,
      status: doctors.length > 0 ? 'referred' : 'pending',
      triageId: triageId
    });

    await emergencyRecord.save();
    console.log('✅ EMERGENCY Patient Created Successfully!');
    console.log(`- Patient Name: ${emergencyRecord.patientName}`);
    console.log(`- Triage ID: ${emergencyRecord.triageId}`);
    console.log(`- Urgency Level: ${emergencyRecord.aiAnalysis.urgencyLevel}`);
    console.log(`- Status: ${emergencyRecord.status}`);
    if (doctors.length > 0) {
      console.log(`- Referred to Doctor: Dr. ${doctors[0].profile?.lastName || doctors[0].email}`);
    }

    // If there are other doctors, let's create a copy referred to each doctor so all doctors see it!
    for (let i = 1; i < doctors.length; i++) {
      const copyRecord = new TriageRecord({
        patientName: `Elena Rostova (CRITICAL EMERGENCY)`,
        age: 62,
        gender: 'female',
        contactNumber: '+1 (555) 911-8811',
        symptoms: 'Sudden onset focal neurological deficit, right-sided hemiplegia, facial droop, dysarthria, fever 101.8°F.',
        vitals: {
          temperature: '101.8',
          bloodPressure: '185/115',
          pulseRate: '104',
          spO2: '93%'
        },
        aiAnalysis: {
          urgencyLevel: 'Emergency',
          riskScore: 9.5,
          possibleConditions: [
            'Acute Ischemic Stroke',
            'Intracerebral Hemorrhage',
            'Encephalitis / Meningitis'
          ],
          reasoning: 'Critical stroke window alert with hyperpyrexia. Requires hyperacute stroke team notification and emergent non-contrast head CT.'
        },
        receptionistId: receptionist._id,
        doctorReferred: doctors[i]._id,
        status: 'referred',
        triageId: 'TRG-' + (Date.now() + i).toString().slice(-6)
      });
      await copyRecord.save();
      console.log(`- Created additional Emergency Record for Dr. ${doctors[i].email}`);
    }

    process.exit(0);
  } catch (err) {
    console.error('Error creating emergency patient:', err);
    process.exit(1);
  }
}

createEmergencyPatient();
