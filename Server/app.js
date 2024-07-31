const express = require('express');
const cors = require('cors');
const app = express();
const dbConn = require('./config/dbConn');
const resourceRoutes = require('./routes/resourceRoutes');

app.use(cors());
app.use(express.json());
app.use('/api', resourceRoutes);

module.exports = app;