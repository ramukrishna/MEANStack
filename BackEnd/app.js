const express = require('express');
const mongoose = require('./db'); // Ensure this matches your connection file
const User = require('./Shema/user');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

// Route to create a new user
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Route to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
