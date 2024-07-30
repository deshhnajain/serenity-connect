// Server/models/Resource.js
const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Resource', ResourceSchema);
