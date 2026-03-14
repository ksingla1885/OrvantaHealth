const mongoose = require('mongoose');

const triageRecordSchema = new mongoose.Schema({
  // Linked to user (optional - guest patients can also use symptom checker)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },

  // Patient-entered inputs
  symptoms: [{
    type: String,
    trim: true
  }],
  vitals: {
    bloodPressure: { type: String },       // e.g. "120/80"
    temperature: { type: Number },         // in °F
    heartRate: { type: Number },           // bpm
    oxygenSaturation: { type: Number },    // SpO2 %
    respiratoryRate: { type: Number }      // breaths/min
  },
  painLevel: {
    type: Number,
    min: 0,
    max: 10,
    required: true
  },
  additionalInfo: {
    age: { type: Number },
    gender: { type: String, enum: ['male', 'female', 'other', ''] },
    duration: { type: String },            // e.g. "2 days"
    medicalHistory: { type: String }
  },

  // AI Analysis Output
  aiAnalysis: {
    urgencyLevel: {
      type: String,
      enum: ['HIGH', 'MEDIUM', 'LOW'],
      required: true
    },
    urgencyReason: { type: String },
    riskScore: { type: Number, min: 0, max: 100 },
    possibleConditions: [{
      name: { type: String },
      probability: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'] },
      description: { type: String }
    }],
    recommendedDepartment: { type: String },
    recommendedAction: { type: String },
    warningFlags: [{ type: String }],
    disclaimer: { type: String }
  },

  // Status tracking
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'escalated', 'resolved'],
    default: 'pending'
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewNotes: { type: String },

  // Prescription issued from triage
  prescription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription'
  },

}, { timestamps: true });

// Index for fast queue queries sorted by risk score
triageRecordSchema.index({ 'aiAnalysis.riskScore': -1, createdAt: -1 });
triageRecordSchema.index({ 'aiAnalysis.urgencyLevel': 1, status: 1 });

module.exports = mongoose.model('TriageRecord', triageRecordSchema);
