// Server/config/dbConn.js
const mongoose = require('mongoose');
const chalk = require('chalk');
require('dotenv').config();  // Load environment variables

const url = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(chalk.green('MongoDB connected'));
  } catch (err) {
    console.error(chalk.red(err.message));
    process.exit(1);
  }
};

module.exports = connectDB;
