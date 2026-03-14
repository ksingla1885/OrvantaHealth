const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: false   // optional — triage walk-in patients have no appointment
  },
  triageRecordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TriageRecord',
    required: false   // set when prescription is issued from triage queue
  },
  patientName: {    // stored for walk-in patients not registered in system
    type: String
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: false
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  diagnosis: {
    type: String,
    required: true
  },
  medicines: [{
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    duration: { type: String, required: true },
    instructions: { type: String }
  }],
  tests: [{
    name: { type: String, required: true },
    instructions: { type: String }
  }],
  advice: {
    type: String
  },
  followUpDate: {
    type: Date
  },
  receipt: {
    type: String // file path
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
