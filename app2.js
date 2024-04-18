const express = require('express');
const app = express();
const port = 3000;

// Middleware for logging
const morgan = require('morgan');
app.use(morgan('dev'));

// Route to display formatted JSON data
app.get('/groups', (req, res) => {
  const groupData = require('./data/group_data.json');
  const formattedData = JSON.stringify(groupData, null, 2);
  res.setHeader('Content-Type', 'application/json');
  res.send(formattedData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
