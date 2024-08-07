const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  _id: String,  // Change _id to String to accept heading as _id
  heading: {
    type: String,
    required: true,
    unique: true
  },
  photoUrls: { type: [String], required: true },
  definition: { type: String, required: true },
  tips: { type: [String], required: true },
  videos: { type: [String], required: true, validate: [arrayLimit, '{PATH} exceeds the limit of 2'] },
  mythsAndFacts: [{
    question: { type: String, required: true },
    answer: { type: String, required: true }
  }]
});

function arrayLimit(val) {
  return val.length <= 2;
}

// Ensure the model uses the existing "resources" collection
module.exports = mongoose.model('Resource', resourceSchema, 'resources');