const express = require('express');
const cors = require('cors');
const session = require('express-session');
const connectDB = require('./config/config');
const therapistRoutes = require('./route/therapistRoutes');
const appointmentRoutes = require('./route/appointmentRoutes');
const therapistauthRoutes = require('./route/therapistauthRoutes');
const userRoutes = require('./route/userRoutes');
const authRoutes = require('./route/auth'); // Add this line
const passport = require('./config/passportConfig'); // Add this line

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', userRoutes);
app.use('/api/auth', therapistauthRoutes);
app.use('/api/therapists', therapistRoutes);
app.use('/api/appointments', appointmentRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
