const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  event: {
    type: String,
    default: "Appointment",
    required: false
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
