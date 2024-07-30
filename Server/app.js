// Server/app.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbConn');
const resourceRoutes = require('./routes/resourceRoutes');
require('dotenv').config();  // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/resources', resourceRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Hello World from the server!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
