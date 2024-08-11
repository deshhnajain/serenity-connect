import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, CircularProgress, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './therapistdetails.css';
import { Rating } from '@mui/material';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            navigate('/user-login', { state: { from: `/therapist/${id}` } });
          }
        } else {
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
    resetAppointmentDetails();
  };

  const resetAppointmentDetails = () => {
    if (currentUser) {
      setAppointmentDetails({
        name: currentUser.name,
        email: currentUser.email,
        time: '',
        notes: ''
      });
    } else {
      setAppointmentDetails({
        name: '',
        email: '',
        time: '',
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
    if (!appointmentDetails.name || !appointmentDetails.email || !appointmentDetails.time || !appointmentDetails.notes || !date) {
      setFormError('Please fill out all fields before submitting.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

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
          time: appointmentDetails.time,
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
      
      // Simulate a delay to show the success message
      setTimeout(() => {
        handleClose();
        navigate('/services/therapy');
      }, 2000);
    } catch (err) {
      console.error('Appointment booking error:', err.response?.data || err.message);
      if (err.response?.status === 401) {
        navigate('/user-login', { state: { from: `/therapist/${id}` } });
      } else {
        setError('Failed to book appointment. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading) return <div className="loading-container"><CircularProgress /></div>;
  if (error) return <p>Error loading data: {error}</p>;

  return (
    <div className="therapist-details-container">
      <Card className="therapist-details-card">
        <div className="image-container">
          <img
            src={therapist.profilePicture}
            alt={therapist.name}
            className="therapist-image"
          />
        </div>
        <div className="content-container">
          <CardContent>
            <Typography variant="h4" component="div" className="therapist-name">{therapist.name}</Typography>
            <Typography variant="subtitle1" color="textSecondary" className="therapist-subtitle">
              Specialization: {therapist.specialization}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" className="therapist-subtitle">
              Availability: {therapist.availability.join(', ')}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" className="therapist-subtitle">
              Location: {therapist.location}
            </Typography>
            <div className="rating-container">
              <Typography variant="subtitle1" color="textSecondary" component="span">
                Rating:
              </Typography>
              <Rating
                name="read-only"
                value={therapist.rating}
                precision={0.5}
                readOnly
              />
              <Typography variant="subtitle1" color="textSecondary" component="span">
                ({therapist.rating})
              </Typography>
            </div>
            <Typography variant="body1" color="textSecondary" className="therapist-description">
              {therapist.description || 'No description available.'}
            </Typography>
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
        </div>
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
            margin="dense"
            name="time"
            label="Time"
            type="time"
            fullWidth
            value={appointmentDetails.time}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
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
          {isSubmitting && (
            <div className="loading-overlay">
              <CircularProgress />
              <Typography>Booking your appointment...</Typography>
            </div>
          )}
          {formError && <Typography color="error" className="error-message">{formError}</Typography>}
          {successMessage && <Typography color="success" className="success-message">{successMessage}</Typography>}
          {error && <Typography color="error" className="error-message">{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleAppointmentSubmit} color="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TherapistDetails;