const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Therapist = require('../models/therapist');

// Register Therapist
exports.registerTherapist = async (req, res) => {
  const { name, email, password, specialization, availability, location, rating, profilePicture, description, address, phonenumber } = req.body;
  
  try {
    const existingTherapist = await Therapist.findOne({ email });
    if (existingTherapist) {
      return res.status(400).json({ message: 'Therapist already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTherapist = new Therapist({ 
      name, 
      email, 
      password: hashedPassword, 
      specialization, 
      availability, 
      location, 
      rating, 
      profilePicture, 
      description,
      address,
      phonenumber
    });

    await newTherapist.save();
    res.status(201).json({ message: 'Therapist registered successfully' });
  } catch (error) {
    console.error('Error registering therapist:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Login Therapist
exports.loginTherapist = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request received:', { email, password });

  try {
    const therapist = await Therapist.findOne({ email });
    if (!therapist) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, therapist.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: therapist._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ 
      token,
      therapistId: therapist._id // Include therapist ID in the response
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
