// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { signup, login ,getAllUsers} = require('../controllers/userController');
const authenticateUser = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/users/me', authenticateUser, userController.getCurrentUser);
router.get('/users', getAllUsers);

module.exports = router;
