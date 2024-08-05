const express = require('express');
const { registerTherapist, loginTherapist } = require('../controllers/therapistauthController');

const router = express.Router();

router.post('/register', registerTherapist);
router.post('/login', loginTherapist);

module.exports = router;