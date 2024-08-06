import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Header from '../../Component/therapy/searchbar';
import TherapyHeader from '../../Component/therapy/Therapyheader';
import './therapistlist.css'; // Import custom CSS

const TherapistsList = () => {
  const [therapists, setTherapists] = useState([]);
  const [filteredTherapists, setFilteredTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    axios.get('http://localhost:5000/api/therapists')
      .then(response => {
        setTherapists(response.data);
        setFilteredTherapists(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (filters) => {
    const { name, specializations } = filters;
    const filtered = therapists.filter(therapist =>
      therapist.name.toLowerCase().includes(name.toLowerCase()) &&
      (specializations.length === 0 || specializations.includes(therapist.specialization))
    );
    setFilteredTherapists(filtered);
  };

  const handleBookAppointment = (therapistId) => {
    const isAuthenticated = localStorage.getItem('token'); // Example authentication check

    if (!isAuthenticated) {
      setSnackbarOpen(true);
      setTimeout(() => navigate('/user-login'), 2000); // Redirect to login page after 2 seconds
      return;
    }

    navigate(`/therapists/${therapistId}`);
  };

  const handleInfoOpen = (therapist) => {
    setSelectedTherapist(therapist);
    setOpen(true);
  };

  const handleInfoClose = () => {
    setOpen(false);
    setSelectedTherapist(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const uniqueSpecializations = [...new Set(therapists.map(therapist => therapist.specialization))];

  if (loading) return <div className="loading-container"><CircularProgress /></div>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <>
      <TherapyHeader />
      <Header onSearch={handleSearch} specializations={uniqueSpecializations} />
      <div className="therapists-container">
        <Grid container spacing={3}>
          {filteredTherapists.map(therapist => (
            <Grid item xs={12} sm={6} md={4} key={therapist._id}>
              <Card className="therapist-card">
                <img
                  src={therapist.profilePicture}
                  alt={therapist.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>{therapist.name}</Typography>
                  <Typography color="textSecondary" variant="body2">Specialization: {therapist.specialization}</Typography>
                  <Typography color="textSecondary" variant="body2">Availability: {therapist.availability.join(', ')}</Typography>
                  <Typography color="textSecondary" variant="body2">Location: {therapist.location}</Typography>
                  <Typography color="textSecondary" variant="body2">Rating: {therapist.rating}</Typography>
                  <div className="buttons-container">
                    <Button
                      className="book-appointment-btn"
                      variant="contained"
                      color="primary"
                      onClick={() => handleBookAppointment(therapist._id)}
                    >
                      Book Appointment
                    </Button>
                    <Button
                      className="info-btn"
                      variant="outlined"
                      color="secondary"
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

        {selectedTherapist && (
          <Dialog
            open={open}
            onClose={handleInfoClose}
            PaperProps={{ className: 'dialog-paper dialog-container' }}
            aria-labelledby="therapist-info-dialog"
          >
            <DialogTitle id="therapist-info-dialog" className="dialog-title">
              {selectedTherapist.name}
            </DialogTitle>
            <DialogContent className="dialog-content">
              <Typography variant="body1">
                <strong>Specialization:</strong> {selectedTherapist.specialization}
              </Typography>
              <Typography variant="body1">
                <strong>Availability:</strong> {selectedTherapist.availability.join(', ')}
              </Typography>
              <Typography variant="body1">
                <strong>Location:</strong> {selectedTherapist.location}
              </Typography>
              <Typography variant="body1">
                <strong>Rating:</strong> {selectedTherapist.rating}
              </Typography>
              <Typography variant="body1">
                <strong>Description:</strong> {selectedTherapist.description || 'No description available.'}
              </Typography>
            </DialogContent>
            <DialogActions className="dialog-actions">
              <Button onClick={handleInfoClose} variant="outlined" color="secondary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="warning">
          You need to log in before booking an appointment.
        </Alert>
      </Snackbar>
    </>
  );
};

export default TherapistsList;
