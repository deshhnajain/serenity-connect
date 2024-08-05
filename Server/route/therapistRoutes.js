const express = require('express');
const router = express.Router();
const therapistController = require('../controllers/therapistController');

router.get('/', therapistController.getAllTherapists);
router.get('/:id', therapistController.getTherapistById);
router.put('/:id', therapistController.updateTherapist);
// router.delete('/:id', therapistController.deleteTherapist);

module.exports = router;