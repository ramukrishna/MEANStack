const express = require('express');
const mongoose = require('./db'); // Ensure this matches your connection file
const UserDetail = require('./Schema/user_details');
const UserLogin = require('./Schema/user_login');
const { v4: uuidv4 } = require('uuid'); // Import the uuid library

const { hashPassword, verifyPassword } = require('./Services/utils');

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
  const p_hash = await hashPassword(req.body.password);

  const loginschema = new UserLogin({ u_id,p_hash, ...req.body });
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

// Login a user
app.post('/login', async (req, res) => {
  try {
    const { u_name, password } = req.body;
    const user = await UserLogin.findOne({ u_name });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const isMatch = await verifyPassword(password, user.p_hash);
    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }

    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



