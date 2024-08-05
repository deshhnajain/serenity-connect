// app.js
const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello World from the server!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});