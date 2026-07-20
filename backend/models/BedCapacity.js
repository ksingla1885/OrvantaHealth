const mongoose = require('mongoose');

const bedCapacitySchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
    unique: true
  },
  totalBeds: {
    type: Number,
    required: true,
    default: 20
  },
  occupiedBeds: {
    type: Number,
    required: true,
    default: 10
  },
  icuBeds: {
    type: Number,
    required: true,
    default: 5
  },
  occupiedIcuBeds: {
    type: Number,
    required: true,
    default: 2
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BedCapacity', bedCapacitySchema);
