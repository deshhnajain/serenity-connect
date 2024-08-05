const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  specialization: String,
  availability: [String],
  location: String,
  address: String,
  phonenumber: Number,
  rating: Number,
  profilePicture: String,
  description: String
});

const Therapist = mongoose.model('Therapist', therapistSchema);

module.exports = Therapist;
