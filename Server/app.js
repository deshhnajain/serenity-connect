import mongoose from 'mongoose'
import express from 'express'
// const userRoutes = require('./route/userRoutes'); // Ensure this is declared only once
import userRoutes from './route/userRoutes.js'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const app = express();


// Middleware
app.use(cors())
app.use(express.json());

// Routes
app.use('/api', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
