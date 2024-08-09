const Razorpay = require('razorpay');
const shortid = require('shortid');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.getPhoto = (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/photo.jpg'));
};

exports.verifyPayment = (req, res) => {
  const secret = process.env.RAZORPAY_SECRET || 'razorpaysecret';

  const shasum = crypto.createHmac('sha256', secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest('hex');

  if (digest === req.headers['x-razorpay-signature']) {
    res.status(200).json({ message: 'OK' });
  } else {
    res.status(403).json({ message: 'Invalid' });
  }
};

exports.createOrder = async (req, res) => {
  const payment_capture = 1;
  const amount = req.body.amount || 1; // Default amount to 1 if not provided
  const currency = 'INR';

  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.status(200).json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
