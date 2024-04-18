const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware for logging
const morgan = require('morgan');
app.use(morgan('dev'));

// Middleware for parsing JSON data
app.use(express.json());

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', './views');

// Load initial data from JSON file
let groups = require('./data/group_data.json');

// Root route - display a welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the Group Management System');
});

// Create a new group
app.post('/groups', (req, res) => {
  const newGroup = req.body;
  groups.push(newGroup);
  saveGroupsToFile(groups); // Save groups to file
  res.status(201).json(newGroup);
});

// Read all groups
app.get('/groups', (req, res) => {
  res.render('groups', { groups: groups });
});

// Read a specific group
app.get('/groups/:id', (req, res) => {
  const id = req.params.id;
  const group = groups.find(g => g.id === parseInt(id));
  if (!group) {
    res.status(404).send('Group not found');
  } else {
    res.json(group);
  }
});

// Update a group
app.put('/groups/:id', (req, res) => {
  const id = req.params.id;
  const updatedGroup = req.body;
  const index = groups.findIndex(g => g.id === parseInt(id));
  if (index === -1) {
    res.status(404).send('Group not found');
  } else {
    groups[index] = updatedGroup;
    saveGroupsToFile(groups); // Save groups to file
    res.json(updatedGroup);
  }
});

// Delete a group
app.delete('/groups/:id', (req, res) => {
  const id = req.params.id;
  groups = groups.filter(g => g.id !== parseInt(id));
  saveGroupsToFile(groups); // Save groups to file
  res.send('Group deleted');
});

// Save groups array to JSON file
function saveGroupsToFile(groups) {
  fs.writeFileSync('./data/group_data.json', JSON.stringify(groups, null, 2));
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
