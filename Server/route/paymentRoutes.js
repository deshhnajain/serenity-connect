const express = require('express');
const router = express.Router();
const razorpayController = require('../controllers/razorpayController');

router.get('/photo.jpg', razorpayController.getPhoto);
router.post('/verification', razorpayController.verifyPayment);
router.post('/razorpay', razorpayController.createOrder);

module.exports = router;
