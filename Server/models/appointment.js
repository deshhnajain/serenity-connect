const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
therapistId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Therapist' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String }, // Optional field
  notes: { type: String }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
