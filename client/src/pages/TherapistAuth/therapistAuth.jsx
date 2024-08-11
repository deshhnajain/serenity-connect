import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, CircularProgress, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './TherapistAuth.css';

const LoginSignup = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    specialization: '',
    availability: '',
    location: '',
    rating: 0,
    profilePicture: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    axios.post('http://localhost:5000/api/auth/login', loginData)
      .then(response => {
        // Assuming the response contains `token` and `therapistId`
        const { token, therapistId } = response.data;
        localStorage.setItem('token', token);
        // In your login function, store the therapistId in local storage
        localStorage.setItem('therapistId', response.data.therapistId);
        // Store therapist ID
        navigate('/therapist-dashboard');
        setLoading(false);
      })
      .catch(error => {
        setError('Invalid email or password');
        setLoading(false);
      });
  };


  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!signupData.name || !signupData.email || !signupData.password) {
      setError('Please fill out all required fields.');
      return;
    }
    setLoading(true);
    axios.post('http://localhost:5000/api/auth/register', signupData)
      .then(response => {
        alert('Registration successful');
        setLoading(false);
        setSignupData({
          name: '',
          email: '',
          password: '',
          specialization: '',
          availability: '',
          location: '',
          rating: 0,
          profilePicture: '',
          description: ''
        });
      })
      .catch(error => {
        setError(error.response?.data?.message || 'Error registering therapist');
        setLoading(false);
      });
  };

  return (
    <Container maxWidth="md" className='LoginSignup-container'>
      <Box className={`container ${isSignUp ? 'active' : ''}`}>
        <div className="form-container sign-up">
          <form onSubmit={handleSignupSubmit}>
            <Typography variant="h4" gutterBottom>Create Account</Typography>
            {error && <Alert severity="error" className="error-alert">{error}</Alert>}
            <TextField
              name="name"
              label="Name"
              fullWidth
              margin="normal"
              value={signupData.name}
              onChange={handleSignupChange}
              className="text-field"
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={signupData.email}
              onChange={handleSignupChange}
              className="text-field"
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={signupData.password}
              onChange={handleSignupChange}
              className="text-field"
            />
            <TextField
              name="specialization"
              label="Specialization"
              fullWidth
              margin="normal"
              value={signupData.specialization}
              onChange={handleSignupChange}
              className="text-field"
            />
            <TextField
              name="address"
              label="address"
              fullWidth
              margin="normal"
              value={signupData.address}
              onChange={handleSignupChange}
              className="text-field"
            />
            {/* <TextField
              name="availability"
              label="Availability"
              fullWidth
              margin="normal"
              value={signupData.availability}
              onChange={handleSignupChange}
              className="text-field"
            />
            <TextField
              name="location"
              label="Location"
              fullWidth
              margin="normal"
              value={signupData.location}
              onChange={handleSignupChange}
              className="text-field"
            /> */}
            {/* <TextField
              name="profilePicture"
              label="Profile Picture URL"
              fullWidth
              margin="normal"
              value={signupData.profilePicture}
              onChange={handleSignupChange}
              className="text-field"
            /> */}
            <TextField
              name="description"
              label="Description"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              value={signupData.description}
              onChange={handleSignupChange}
              className="text-field"
            />
            <Button type="submit" variant="contained" color="primary" className="submit-button" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Sign Up'}
            </Button>
          </form>
        </div>

        <div className="form-container sign-in">
          <form onSubmit={handleLoginSubmit}>
            <Typography variant="h4" gutterBottom>Sign in</Typography>
            {error && <Alert severity="error" className="error-alert">{error}</Alert>}
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={loginData.email}
              onChange={handleLoginChange}
              className="text-field"
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={loginData.password}
              onChange={handleLoginChange}
              className="text-field"
            />
            <Button type="submit" variant="contained" color="primary" className="submit-button" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <Typography variant="h4" gutterBottom>Welcome Back!</Typography>
              <p>To keep connected with us please login with your personal info</p>
              <Button className="ghost" onClick={() => setIsSignUp(false)}>Sign In</Button>
            </div>
            <div className="toggle-panel toggle-right">
              <Typography variant="h4" gutterBottom>Create Account as a Therapist</Typography>
              <p>Enter your personal details and start journey with us</p>
              <Button className="ghost" onClick={() => setIsSignUp(true)}>Sign Up</Button>
            </div>
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default LoginSignup;
