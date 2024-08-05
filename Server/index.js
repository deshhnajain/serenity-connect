import express from 'express';
import cors from 'cors';
import connectDB from './config/config.js';
import therapistRoutes from './routes/therapistRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import therapistauthRoutes from './routes/therapistauthRoutes.js';

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
