const express = require('express');
const app = express();
const port = 3000;

// Middleware for logging
const morgan = require('morgan');
app.use(morgan('dev'));

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', './views');

// Route to display group names with details
app.get('/', (req, res) => {
  const groupData = require('./data/group_data.json');
  res.render('index', { groups: groupData.groups });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
