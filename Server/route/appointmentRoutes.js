// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authenticateUser = require('../middleware/authMiddleware');

router.get('/', appointmentController.getAllAppointments);
router.get('/user', authenticateUser, appointmentController.getAllAppointmentsByUser);
router.get('/:id', authenticateUser, appointmentController.getAppointmentById);
router.post('/', authenticateUser, appointmentController.createAppointment);
router.put('/:id', authenticateUser, appointmentController.updateAppointment);
router.delete('/:id', authenticateUser, appointmentController.deleteAppointment);

module.exports = router;
