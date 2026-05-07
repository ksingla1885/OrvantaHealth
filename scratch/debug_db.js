const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });

const Appointment = require('../backend/models/Appointment');
const Patient = require('../backend/models/Patient');

async function debug() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI not found in .env');

    console.log('Connecting to database...');
    await mongoose.connect(uri);
    console.log('Connected successfully.\n');
    
    const count = await Appointment.countDocuments();
    console.log(`Total Appointments in System: ${count}`);
    
    console.log('Checking recent appointments for MRN population...');
    const sample = await Appointment.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('patientId');

    sample.forEach((apt, i) => {
      const mrn = apt.patientId ? apt.patientId.medicalRecordNumber : 'MISSING (Broken Reference)';
      console.log(`[${i+1}] Apt ID: ${apt._id} | Patient MRN: ${mrn}`);
    });
    
    console.log('\nDebug complete.');
    process.exit(0);
  } catch (err) {
    console.error('Debug Error:', err.message);
    process.exit(1);
  }
}

debug();
