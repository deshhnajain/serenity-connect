const Resource = require('../models/Resource');

// Fetch all resources
const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch a single resource by heading (treated as ID)
const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new resource
const createResource = async (req, res) => {
  const resource = new Resource({
    _id: req.body.heading,  // Set _id to heading
    heading: req.body.heading,
    photoUrls: req.body.photoUrls,
    definition: req.body.definition,
    tips: req.body.tips,
    videos: req.body.videos,
    mythsAndFacts: req.body.mythsAndFacts
  });

  try {
    const newResource = await resource.save();
    res.status(201).json(newResource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a resource
const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    await resource.remove();
    res.json({ message: 'Resource deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllResources,
  getResourceById,
  createResource,
  deleteResource
};
