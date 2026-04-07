const mongoose = require('mongoose');

const triageRecordSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  symptoms: {
    type: String,
    required: true
  },
  vitals: {
    temperature: String,
    bloodPressure: String,
    pulseRate: String,
    spO2: String
  },
  aiAnalysis: {
    urgencyLevel: {
      type: String,
      enum: ['Routine', 'Urgent', 'Emergency'],
      default: 'Routine'
    },
    riskScore: {
      type: Number,
      min: 0,
      max: 10,
      default: 0
    },
    possibleConditions: [String],
    reasoning: String
  },
  receptionistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctorReferred: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['pending', 'referred', 'in-consultation', 'completed', 'resolved', 'cancelled'],
    default: 'pending'
  },
  diagnosis: {
    type: String,
    trim: true
  },
  prescribedMedicines: [{
    name: String,
    dosage: String,
    frequency: String,
    duration: String,
    instructions: String
  }],
  tests: [{
    name: String,
    instructions: String
  }],
  advice: String,
  followUpDate: Date,
  triageId: {
    type: String,
    unique: true,
    required: true
  },
  checkedInAt: Date,
  checkedOutAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  resolvedAt: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('TriageRecord', triageRecordSchema);
