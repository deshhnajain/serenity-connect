const Appointment = require('../models/appointment');

// Get all appointments for a specific therapist
exports.getAllAppointments = async (req, res) => {
  const therapistId = req.query.therapistId; // Get therapistId from query parameters
  if (!therapistId) {
    return res.status(400).json({ message: 'Therapist ID is required' });
  }

  try {
    const appointments = await Appointment.find({ therapistId });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get an appointment by ID
exports.getAppointmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new appointment
exports.createAppointment = async (req, res) => {
  const { therapistId, name, email, date, time, notes } = req.body;
  const newAppointment = new Appointment({ therapistId, name, email, date, time, notes });

  try {
    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an appointment
exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { therapistId,  date, time, notes } = req.body;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, { therapistId,date, time, notes }, { new: true });
    res.json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    await Appointment.findByIdAndDelete(id);
    res.json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};