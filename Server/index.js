const express = require('express');
const cors = require('cors');
// const session = require('express-session');
const connectDB = require('./config/config');
const therapistRoutes = require('./route/therapistRoutes');
const appointmentRoutes = require('./route/appointmentRoutes');
const therapistauthRoutes = require('./route/therapistauthRoutes');
const userRoutes = require('./route/userRoutes');
const resourceRoutes = require('./route/resourceRoutes');
const paymentRoutes = require('./route/paymentRoutes');
// const authRoutes = require('./route/auth');
// const passport = require('./config/passportConfig'); 

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

const users = [{ id: 1, name: 'User One' }, { id: 2, name: 'User Two' }];
const therapists = [{ id: 1, name: 'Therapist One' }, { id: 2, name: 'Therapist Two' }];

// Admin API routes
app.get('/api/admin/users', (req, res) => {
  res.json(users);
});

app.get('/api/admin/therapists', (req, res) => {
  res.json(therapists);
});

// app.use(session({
//   secret: 'your_secret_key',
//   resave: false,
//   saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// Routes
app.use('/api', userRoutes);
app.use('/api/auth', therapistauthRoutes);
app.use('/api/therapists', therapistRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api', resourceRoutes);
app.use('/api/payment', paymentRoutes);
//Not Used this is for the google auth It is workinig but not used in the code because of the appointement functionality, will make this work later
// app.use(authRoutes); 

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
