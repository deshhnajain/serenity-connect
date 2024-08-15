const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// GET all messages
router.get('/', messageController.getMessages);

// POST a new message
router.post('/', messageController.createMessage);

module.exports = router;
