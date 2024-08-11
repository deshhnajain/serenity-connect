const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  therapistId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Therapist', 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  time: { 
    type: String, 
    required: true 
  },
  notes: { 
    type: String 
  },
  jitsiMeetingUrl: { 
    type: String, 
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled'
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);