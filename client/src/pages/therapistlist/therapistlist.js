import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../Component/therapy/searchbar';
import TherapyHeader from '../../Component/therapy/Therapyheader';
import './therapistlist.css';

const TherapistsList = () => {
  const [therapists, setTherapists] = useState([]);
  const [filteredTherapists, setFilteredTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const navigate = useNavigate();

  const fetchTherapists = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/therapists');
      setTherapists(response.data);
      setFilteredTherapists(response.data);
    } catch (err) {
      setError(err.message);
      showSnackbar('Failed to load therapists. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTherapists();
  }, [fetchTherapists]);

  const handleSearch = useCallback((filters) => {
    const { name, specializations } = filters;
    const filtered = therapists.filter(therapist =>
      therapist.name.toLowerCase().includes(name.toLowerCase()) &&
      (specializations.length === 0 || specializations.includes(therapist.specialization))
    );
    setFilteredTherapists(filtered);
  }, [therapists]);

  const handleBookAppointment = useCallback((therapistId) => {
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
      showSnackbar('You need to log in before booking an appointment.', 'warning');
      setTimeout(() => navigate('/user-login'), 2000);
      return;
    }

    navigate(`/therapists/${therapistId}`);
  }, [navigate]);

  const handleInfoOpen = useCallback((therapist) => {
    setSelectedTherapist(therapist);
    setOpen(true);
  }, []);

  const handleInfoClose = useCallback(() => {
    setOpen(false);
    setSelectedTherapist(null);
  }, []);

  const showSnackbar = useCallback((message, severity = 'info') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const handleSnackbarClose = useCallback((event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  }, []);

  const uniqueSpecializations = Array.from(new Set(therapists.map(therapist => therapist.specialization)));

  if (loading) return <div className="loading-container"><CircularProgress /></div>;
  if (error) return <p className="error-message">Error loading data: {error}</p>;

  return (
    <>
      <TherapyHeader />
      <Header onSearch={handleSearch} specializations={uniqueSpecializations} />
      <div className="therapists-container">
        <Grid container spacing={3}>
          {filteredTherapists.map(therapist => (
            <Grid item xs={12} sm={6} md={4} key={therapist._id}>
              <Card className="therapist-card">
                <img src={therapist.profilePicture} alt={therapist.name} />
                <CardContent>
                  <Typography variant="h6" component="div">{therapist.name}</Typography>
                  <Typography color="textSecondary" variant="body2">Specialization: {therapist.specialization}</Typography>
                  <Typography color="textSecondary" variant="body2">Availability: {therapist.availability}</Typography>
                  <Typography color="textSecondary" variant="body2">Location: {therapist.location}</Typography>
                  <Typography color="textSecondary" variant="body2">Rating: {therapist.rating}</Typography>
                  <div className="buttons-container">
                    <Button
                      className="book-appointment-btn"
                      variant="contained"
                      onClick={() => handleBookAppointment(therapist._id)}
                    >
                      Book Appointment
                    </Button>
                    <Button
                      className="info-btn"
                      variant="outlined"
                      onClick={() => handleInfoOpen(therapist)}
                    >
                      Info
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog
  open={open}
  onClose={handleInfoClose}
  PaperProps={{ className: 'dialog-container' }}
  aria-labelledby="therapist-info-dialog"
>
  <div className="dialog-header">
    <Typography variant="h2" className="dialog-title">
      {selectedTherapist?.name}
    </Typography>
    <Typography variant="subtitle1" className="dialog-subtitle">
      {selectedTherapist?.specialization}
    </Typography>
  </div>
  <DialogContent className="dialog-content">
    {selectedTherapist && (
      <>
        <div className="info-item">
          <span className="info-icon">📅</span>
          <div className="info-text">
            <div className="info-label">Availability</div>
            <div className="info-value">{selectedTherapist.availability}</div>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon">📍</span>
          <div className="info-text">
            <div className="info-label">Location</div>
            <div className="info-value">{selectedTherapist.location}</div>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon">⭐</span>
          <div className="info-text">
            <div className="info-label">Rating</div>
            <div className="info-value">{selectedTherapist.rating}</div>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon">ℹ️</span>
          <div className="info-text">
            <div className="info-label">Description</div>
            <div className="info-value">{selectedTherapist.description || 'No description available.'}</div>
          </div>
        </div>
      </>
    )}
  </DialogContent>
  <DialogActions className="dialog-actions">
    <Button onClick={handleInfoClose} className="close-button">
      Close
    </Button>
  </DialogActions>
</Dialog>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TherapistsList;