const Therapist = require('../models/therapist');

// Get all therapists
exports.getAllTherapists = async (req, res) => {
  try {
    const therapists = await Therapist.find();
    res.json(therapists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a therapist by ID
exports.getTherapistById = async (req, res) => {
  const { id } = req.params;
  try {
    const therapist = await Therapist.findById(id);
    if (!therapist) {
      return res.status(404).json({ message: 'Therapist not found' });
    }
    res.json(therapist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new therapist
// exports.createTherapist = async (req, res) => {
//   const { name, email, password, specialization, availability, location, rating, profilePicture, description ,phonenumber, address } = req.body;
//   const newTherapist = new Therapist({ name, email, password, specialization, availability, location, rating, profilePicture, description,address ,phonenumber });

//   try {
//     const savedTherapist = await newTherapist.save();
//     res.status(201).json(savedTherapist);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// Update a therapist
exports.updateTherapist = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, specialization, availability, location, rating, profilePicture, description, address, phonenumber } = req.body;

  try {
    const updatedTherapist = await Therapist.findByIdAndUpdate(id, { name, email, password, specialization, availability, location, rating, profilePicture, description, address ,phonenumber }, { new: true });
    res.json(updatedTherapist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// // Delete a therapist
// exports.deleteTherapist = async (req, res) => {
//   const { id } = req.params;

//   try {
//     await Therapist.findByIdAndDelete(id);
//     res.json({ message: 'Therapist deleted' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };