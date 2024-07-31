const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

// Get all resources
router.get('/resources', async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new resource
router.post('/resources', async (req, res) => {
  const resource = new Resource({
    tag: req.body.tag,
    title: req.body.title,
    description: req.body.description,
    link: req.body.link,
    category: req.body.category
  });

  try {
    const newResource = await resource.save();
    res.status(201).json(newResource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a resource
router.delete('/resources/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (resource == null) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    await resource.remove();
    res.json({ message: 'Resource deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;