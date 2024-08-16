require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const connectDB = require('./config/config');
const therapistRoutes = require('./route/therapistRoutes');
const appointmentRoutes = require('./route/appointmentRoutes');
const therapistauthRoutes = require('./route/therapistauthRoutes');
const userRoutes = require('./route/userRoutes');
const resourceRoutes = require('./route/resourceRoutes');
const paymentRoutes = require('./route/paymentRoutes');
const authRoutes = require('./route/auth');
const passport = require('./config/passportConfig'); 
const bodyParser = require('body-parser');
const messageRoutes = require('./route/messageRoutes');
const testimonialRoutes = require('./route/testimonialsRoutes'); // Use a clear variable name

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
app.use(bodyParser.json());

app.get('/api/admin/users', (req, res) => {
  res.json(users);
});

app.get('/api/admin/therapists', (req, res) => {
  res.json(therapists);
});

// Routes
app.use('/api', userRoutes);
app.use('/api/auth', therapistauthRoutes);
app.use('/api/therapists', therapistRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api', resourceRoutes);
app.use('/api/payment', paymentRoutes);
app.use(authRoutes); // Google auth routes
app.use('/api/messages', messageRoutes);
app.use('/api', testimonialRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
