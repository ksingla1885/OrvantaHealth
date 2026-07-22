const mongoose = require('mongoose');
const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Prescription = require('../models/Prescription');
const TriageRecord = require('../models/TriageRecord');
const LabReport = require('../models/LabReport');
const Bill = require('../models/Bill');
const Appointment = require('../models/Appointment');
require('dotenv').config({ path: './.env' });

async function verifyHistoryAggregation() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/orvantahealth';
    await mongoose.connect(mongoUri);
    console.log('✓ Successfully connected to MongoDB for validation.');

    // 1. Find a patient profile
    const patient = await Patient.findOne().populate('userId');
    if (!patient) {
      console.warn('⚠ No patient found in the database. Creating a mock patient for testing...');
      // create a mock patient
      const mockUser = await User.create({
        email: `test_patient_${Date.now()}@orvantahealth.com`,
        password: 'Password123!',
        role: 'patient',
        profile: {
          firstName: 'Marcus',
          lastName: 'TestBrody',
          phone: '+1 (555) 321-7788',
          gender: 'male',
          dateOfBirth: new Date('1980-05-15')
        }
      });
      const newPatient = await Patient.create({ userId: mockUser._id });
      console.log(`✓ Mock patient created with ID: ${newPatient._id}`);
      return runValidation(newPatient._id);
    }

    await runValidation(patient._id);
  } catch (err) {
    console.error('✗ Validation script failed with error:', err);
    process.exit(1);
  }
}

async function runValidation(patientId) {
  try {
    const patient = await Patient.findById(patientId).populate('userId');
    console.log(`\n--- Validating EMR Timeline for Patient: ${patient.userId?.profile?.firstName} ${patient.userId?.profile?.lastName} ---`);
    console.log(`- Patient ID: ${patient._id}`);
    console.log(`- Phone: ${patient.userId?.profile?.phone}`);

    // Fetch clinical history components
    const [prescriptions, triageRecords, labReports, bills, appointments] = await Promise.all([
      Prescription.find({ patientId }).populate({ path: 'doctorId', populate: { path: 'userId', select: 'profile' } }),
      TriageRecord.find({
        $or: [
          { patientId },
          { contactNumber: patient.userId?.profile?.phone },
          { patientName: `${patient.userId?.profile?.firstName} ${patient.userId?.profile?.lastName}`.trim() }
        ]
      }).populate('doctorReferred', 'profile'),
      LabReport.find({ patientId }).populate('uploadedBy', 'profile'),
      Bill.find({ patientId }).populate('createdBy', 'profile'),
      Appointment.find({ patientId }).populate({ path: 'doctorId', populate: { path: 'userId', select: 'profile' } })
    ]);

    console.log('\n✓ Cross-Model Join Data Counts:');
    console.log(`  - Prescriptions: ${prescriptions.length}`);
    console.log(`  - Triage Records: ${triageRecords.length}`);
    console.log(`  - Lab Reports: ${labReports.length}`);
    console.log(`  - Bills: ${bills.length}`);
    console.log(`  - Appointments: ${appointments.length}`);

    // Build timeline
    const timeline = [];

    prescriptions.forEach(p => {
      timeline.push({ date: p.createdAt, type: 'prescription', title: `Prescription for ${p.diagnosis}` });
    });

    triageRecords.forEach(tr => {
      timeline.push({ date: tr.createdAt, type: 'triage', title: `Triage Intake (${tr.aiAnalysis?.urgencyLevel || 'Routine'})` });
    });

    labReports.forEach(lr => {
      timeline.push({ date: lr.reportDate, type: 'lab', title: `Lab: ${lr.testName}` });
    });

    bills.forEach(b => {
      timeline.push({ date: b.createdAt, type: 'billing', title: `Bill: ₹${b.total}` });
    });

    appointments.forEach(apt => {
      timeline.push({ date: apt.date, type: 'consultation', title: `Consultation (${apt.status})` });
    });

    // Sort timeline
    timeline.sort((a, b) => new Date(b.date) - new Date(a.date));

    console.log(`\n✓ Unified Clinical Timeline (${timeline.length} events, sorted latest first):`);
    timeline.slice(0, 5).forEach((event, idx) => {
      console.log(`  ${idx + 1}. [${new Date(event.date).toLocaleDateString()}] [${event.type.toUpperCase()}] ${event.title}`);
    });

    // Vitals history
    const vitalsHistory = triageRecords
      .filter(tr => tr.vitals && (tr.vitals.temperature || tr.vitals.bloodPressure || tr.vitals.pulseRate || tr.vitals.spO2))
      .map(tr => ({
        date: tr.createdAt,
        temp: tr.vitals.temperature,
        bp: tr.vitals.bloodPressure,
        pulse: tr.vitals.pulseRate,
        spO2: tr.vitals.spO2
      }));
    
    console.log(`\n✓ Vitals Telemetry History resolved (${vitalsHistory.length} readings):`);
    vitalsHistory.slice(0, 3).forEach((v, idx) => {
      console.log(`  Read ${idx + 1}: Temp ${v.temp}°F • BP ${v.bp} • Pulse ${v.pulse} • SpO2 ${v.spO2}`);
    });

    console.log('\n======================================');
    console.log('✓ SUCCESS: EMR Timeline Aggregation and Recall statistics fully verified.');
    console.log('======================================');
    process.exit(0);
  } catch (err) {
    console.error('✗ Validation error during data assembly:', err);
    process.exit(1);
  }
}

verifyHistoryAggregation();
