const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonialsController');
// const authMiddleware = require('../middleware/authMiddleware'); // Uncomment if you need authentication middleware

// Public routes
router.get('/testimonials', TestimonialController.getApprovedTestimonials);
router.post('/testimonials', TestimonialController.submitTestimonial);

// Admin routes
// Uncomment and use authMiddleware if you need authentication
router.get('/admin/testimonials', /* authMiddleware, */ TestimonialController.getAllTestimonials);
router.put('/admin/testimonials/:id/visibility', /* authMiddleware, */ TestimonialController.toggleVisibility);
router.delete('/admin/testimonials/:id', /* authMiddleware, */ TestimonialController.deleteTestimonial);

module.exports = router;