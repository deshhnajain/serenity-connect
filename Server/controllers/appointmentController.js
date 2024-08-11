const { v4: uuidv4 } = require('uuid');
const Appointment = require('../models/appointment');
const schedule = require('node-schedule');
const sendEmail = require('../utils/emailService');
const Therapist = require('../models/therapist'); 

exports.getAllAppointments = async (req, res) => {
  const therapistId = req.query.therapistId;
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

exports.getAllAppointmentsByUser = async (req, res) => {
  const userId = req.user.id;
  
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const appointments = await Appointment.find({ userId });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

exports.createAppointment = async (req, res) => {
  const { therapistId, name, email, date, time, notes } = req.body;
  const userId = req.user.id;

  const roomName = uuidv4();
  const jitsiMeetingUrl = `https://meet.jit.si/${roomName}`;

  const newAppointment = new Appointment({
    therapistId,
    userId,
    name,
    email,
    date,
    time,
    notes,
    jitsiMeetingUrl,
    status: 'scheduled'
  });

  try {
    const savedAppointment = await newAppointment.save();

    // Schedule the meeting
    const appointmentDate = new Date(date);
    const [hours, minutes] = time.split(':');
    appointmentDate.setHours(parseInt(hours), parseInt(minutes));

    schedule.scheduleJob(appointmentDate, async function() {
      console.log(`Meeting started for appointment: ${savedAppointment._id}`);
      await Appointment.findByIdAndUpdate(savedAppointment._id, { status: 'in-progress' });
    });

    // Send emails
    try {
      // Send email to user
      await sendEmail({
        to: email,
        subject: 'Appointment Confirmation',
        text: `Your appointment has been scheduled for ${date} at ${time}. Meeting link: ${jitsiMeetingUrl}`
      });

      // Send email to therapist
      const therapist = await Therapist.findById(therapistId);
      if (therapist && therapist.email) {
        await sendEmail({
          to: therapist.email,
          subject: 'New Appointment Scheduled',
          text: `A new appointment has been scheduled for ${date} at ${time}. Patient: ${name}. Meeting link: ${jitsiMeetingUrl}`
        });
      }

      console.log('Confirmation emails sent successfully');
    } catch (emailError) {
      console.error('Error sending confirmation emails:', emailError);
      // Continue with the appointment creation even if emails fail
    }

    res.status(201).json({
      ...savedAppointment._doc,
      message: "Appointment created and meeting scheduled successfully. Confirmation emails may have been sent."
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { therapistId, date, time, notes, status } = req.body;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Cancel the existing scheduled job
    const jobName = appointment._id.toString();
    const existingJob = schedule.scheduledJobs[jobName];
    if (existingJob) {
      existingJob.cancel();
    }

    // Update the appointment
    appointment.therapistId = therapistId || appointment.therapistId;
    appointment.date = date || appointment.date;
    appointment.time = time || appointment.time;
    appointment.notes = notes || appointment.notes;
    appointment.status = status || appointment.status;

    // Reschedule the job if the date or time has changed
    if (date || time) {
      const newAppointmentDate = new Date(date || appointment.date);
      const [hours, minutes] = (time || appointment.time).split(':');
      newAppointmentDate.setHours(parseInt(hours), parseInt(minutes));

      schedule.scheduleJob(jobName, newAppointmentDate, async function() {
        console.log(`Meeting started for appointment: ${appointment._id}`);
        await Appointment.findByIdAndUpdate(appointment._id, { status: 'in-progress' });
        // TODO: Send notifications to user and therapist
      });
    }

    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Cancel the scheduled job
    const jobName = appointment._id.toString();
    const existingJob = schedule.scheduledJobs[jobName];
    if (existingJob) {
      existingJob.cancel();
    }

    await Appointment.findByIdAndDelete(id);
    res.json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};