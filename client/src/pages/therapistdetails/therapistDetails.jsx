import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, CircularProgress, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './therapistdetails.css';
const TherapistDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [therapist, setTherapist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({
    time: '',
    notes: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch therapist details
        const therapistResponse = await axios.get(`http://localhost:5000/api/therapists/${id}`);
        setTherapist(therapistResponse.data);

        // Fetch current user details if token exists
        if (token) {
          try {
            const userResponse = await axios.get('http://localhost:5000/api/users/me', {
              headers: { Authorization: `Bearer ${token}` }
            });
            setCurrentUser(userResponse.data);
            setAppointmentDetails(prevDetails => ({
              ...prevDetails,
              name: userResponse.data.name,
              email: userResponse.data.email
            }));
          } catch (err) {
            // Redirect to login page if user fetch fails
            navigate('/user-login', { state: { from: `/therapist/${id}` } });
          }
        } else {
          // Redirect to login page if no token found
          navigate('/user-login', { state: { from: `/therapist/${id}` } });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSuccessMessage('');
    setFormError('');
    if (currentUser) {
      setAppointmentDetails({
        name: currentUser.name,
        email: currentUser.email,
        notes: ''
      });
    } else {
      setAppointmentDetails({
        name: '',
        email: '',
        notes: ''
      });
    }
  };

  const handleDateChange = date => {
    setDate(date);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setAppointmentDetails({
      ...appointmentDetails,
      [name]: value
    });
  };

  const handleAppointmentSubmit = async () => {
    if (!appointmentDetails.name || !appointmentDetails.email || !appointmentDetails.notes || !date) {
      setFormError('Please fill out all fields before submitting.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/user-login', { state: { from: `/therapist/${id}` } });
        return;
      }

      const response = await axios.post(
        `http://localhost:5000/api/appointments`,
        {
          therapistId: id,
          date: date.toISOString().split('T')[0],
          time: '',
          notes: appointmentDetails.notes,
          name: appointmentDetails.name,
          email: appointmentDetails.email
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setSuccessMessage('Appointment booked successfully!');
      setFormError('');
      handleClose();
      navigate('/services/therapy');
    } catch (err) {
      console.error('Appointment booking error:', err.response?.data || err.message);
      if (err.response?.status === 401) {
        navigate('/user-login', { state: { from: `/therapist/${id}` } });
      } else {
        setError('Failed to book appointment. Please try again.');
      }
    }
  };
  
  if (loading) return <div className="loading-container"><CircularProgress /></div>;
  if (error) return <p>Error loading data: {error}</p>;

  return (
    <div className="therapist-details-container">
      <Card className="therapist-details-card">
        <img
          src={therapist.profilePicture}
          alt={therapist.name}
          className="therapist-image"
        />
        <CardContent>
          <Typography variant="h4" component="div" className="therapist-name">{therapist.name}</Typography>
          <Typography variant="subtitle1" color="textSecondary">Specialization: {therapist.specialization}</Typography>
          <Typography variant="subtitle1" color="textSecondary">Availability: {therapist.availability.join(', ')}</Typography>
          <Typography variant="subtitle1" color="textSecondary">Location: {therapist.location}</Typography>
          <Typography variant="subtitle1" color="textSecondary">Rating: {therapist.rating}</Typography>
          <Typography variant="body1" color="textSecondary">Description: {therapist.description || 'No description available.'}</Typography>
          <div className="button-container">
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/services/therapy')}
              className="back-button"
            >
              Back to List
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleOpen}
              className="book-button"
            >
              Book Appointment
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Book an Appointment</DialogTitle>
        <DialogContent>
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="calendar"
          />
          <TextField
            type="time"
            value={appointmentDetails.time}
            onChange={handleInputChange}
            className="text-field"
          />
          <TextField
            margin="dense"
            name="notes"
            label="Notes"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={appointmentDetails.notes}
            onChange={handleInputChange}
            className="text-field"
          />
          {formError && <Typography color="error" className="error-message">{formError}</Typography>}
          {successMessage && <Typography color="success" className="success-message">{successMessage}</Typography>}
          {error && <Typography color="error" className="error-message">{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAppointmentSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TherapistDetails;
