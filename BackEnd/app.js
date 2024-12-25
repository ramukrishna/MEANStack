const express = require('express');
const mongoose = require('./db'); // Ensure this matches your connection file
const User = require('./Shema/user');
const UserDetail = require('./Shema/user_details');
const UserLogin = require('./Shema/user_login');
const { v4: uuidv4 } = require('uuid'); // Import the uuid library

const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

// Create a new user
app.post('/users', async (req, res) => {
  try {
    const u_id = uuidv4();  // Generate a unique u_id
    const loginshema = new UserLogin({ u_id, ...req.body });
    await loginshema.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await UserLogin.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



