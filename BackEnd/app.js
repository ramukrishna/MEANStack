const express = require('express');
const mongoose = require('./db'); // Ensure this matches your connection file
const User = require('./Schema/user');
const UserDetail = require('./Schema/user_details');
const UserLogin = require('./Schema/user_login');
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

  const u_id = uuidv4();  // Generate a unique u_id
  const loginschema = new UserLogin({ u_id, ...req.body });
  const deatialschema = new UserDetail({ u_id, ...req.body });

  try {

    const userCredential = await loginschema.save();
    const userDetail = await deatialschema.save();

    res.status(201).send(userCredential);

  } catch (err) {
    // Manually rollback User if Profile save fails 
    if (err) {
      await loginschema.deleteOne({ u_id: req.body.u_id });
      await deatialschema.deleteOne({ u_id: req.body.u_id });

    }

    res.status(500).send(err);
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



