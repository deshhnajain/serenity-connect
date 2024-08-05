const express = require('express');
const cors = require('cors');
const connectDB = require('./config/config');
const therapistRoutes = require('./routes/therapistRoutes');
const appointmentRoutes = require('./route/appointmentRoutes');
const therapistauthRoutes = require('./route/therapistauthRoutes');
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', therapistauthRoutes);
app.use('/api/therapists', therapistRoutes);
app.use('/api/appointments', appointmentRoutes);

// Start server
const PORT = process.env.PORT || 3388;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});