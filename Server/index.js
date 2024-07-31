const app = require('./app');
const chalk = require('chalk');
const port = 3388;

app.listen(port, (err) => {
  if (err) {
    console.log(chalk.red('Something went wrong:', err));
  } else {
    console.log(chalk.green(`Server is running on port ${port}`));
  }
});