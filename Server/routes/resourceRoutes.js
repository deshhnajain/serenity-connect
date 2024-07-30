// Server/routes/resourceRoutes.js
const express = require('express');
const router = express.Router();
const Resource = require('../models/resources');

// Add a new resource
router.post('/', async (req, res) => {
  const { tag, title, description, videoUrl } = req.body;
  try {
    const newResource = new Resource({ tag, title, description, videoUrl });
    const savedResource = await newResource.save();
    res.json(savedResource);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get resources by tag
router.get('/:tag', async (req, res) => {
  try {
    const resources = await Resource.find({ tag: req.params.tag });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
