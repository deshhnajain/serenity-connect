const mongoose = require('mongoose');
const chalk = require('chalk');

const url = 'mongodb://localhost:27017/Serenity_connect';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(chalk.green('Connected to MongoDB')))
  .catch(err => console.error(chalk.red('Could not connect to MongoDB:', err)));

module.exports = mongoose;