// Server/index.js
const express = require("express");
const chalk = require("chalk");
const cors = require('cors');
require('dotenv').config();  // Load environment variables

const app = express(); // app is an object

const User = require('./config/user.js');
const resourceRoutes = require('./routes/resourceRoutes');
const connectDB = require('./config/dbConn');

const port = process.env.PORT || 3000;

// Connect to database
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/resources', resourceRoutes);

// Root route
app.get('/', async (req, res) => {
    const getData = await User.find();
    if (getData.length > 0) { // browser can only get data
        res.send(getData);
    } else {
        res.send("no data found");
    }
});

app.post('/postData', (res) => {
    res.send("Hello hunny bunny");
});

app.post('/deleteData', (res) => {
    res.send("Hello hunny bunny");
});

app.listen(port, (err) => { // for running the server
    if (err) {
        console.log(chalk.inverse.red("something went wrong"));
    } else {
        console.log(chalk.inverse.green(`Server is running at http://localhost:${port}`));
    }
});

module.exports = app;
