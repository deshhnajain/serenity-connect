const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

// Get all resources
router.get('/resources', resourceController.getAllResources);

// Get a single resource by heading (treated as ID)
router.get('/resources/:id', resourceController.getResourceById);

// Add a new resource
router.post('/resources', resourceController.createResource);

// Delete a resource by heading (treated as ID)
router.delete('/resources/:id', resourceController.deleteResource);

module.exports = router;
