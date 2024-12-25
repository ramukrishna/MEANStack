const express = require('express');
const mongoose = require('./db'); // Ensure this matches your connection file
const UserDetail = require('./Schema/user_details');
const UserLogin = require('./Schema/user_login');
const { v4: uuidv4 } = require('uuid'); // Import the uuid library

const { hashPassword, verifyPassword } = require('./Services/password_handler');

const sendMail = require('./Services/gmail_hanler');

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

  const loginschema = new UserLogin({ u_id, p_hash, ...req.body });
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


// Get a user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await UserLogin.findOne({ u_id: req.params.id });
    if (!user) return res.status(404).send('User not found');
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a user by ID
app.get('/usersDetails/:id', async (req, res) => {
  try {
    const user = await UserDetail.findOne({ u_id: req.params.id });
    if (!user) return res.status(404).send('User not found');
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a user by ID and all data comes from body to update.
app.put('/updateUserDetail/:u_id', async (req, res) => {

  const { u_id } = req.params;

  try {

    const updates = req.body;

    const originalLoginDetail = await UserDetail.findOne({ u_id });
    if (!originalLoginDetail) return res.status(404).send('User not found');

    // const isMatch = await verifyPassword(password, user.p_hash);
    // if (!isMatch) {
    //   return res.status(401).send('Invalid credentials');
    // }

    let updateFields = updates;

    const user = await UserDetail.findOneAndUpdate({ u_id }, updateFields, { new: true, runValidators: true });
    res.send(user);
  } catch (err) {
    // Revert to the original document if an error occurs 
    await UserLogin.findOneAndUpdate({ u_id }, originalUserLogin.toObject());
    res.status(400).send(err);
  }
});

// Update a user by ID and all data comes from body to update.
app.put('/updateUserPartialData/:u_id', async (req, res) => {
  try {
    const { u_id } = req.params;
    const updates = req.body;

    const originalLoginDetail = await UserDetail.findOne({ u_id });
    if (!originalLoginDetail) return res.status(404).send('User not found');

    // Update the document with $set 

    const user = await UserDetail.findOneAndUpdate({ u_id }, { $set: updates }, { new: true, runValidators: true }); 
    //const updatedUserLogin = await UserLogin.findOneAndUpdate({ u_id }, { $set: updateFields }, { new: true, runValidators: true });
    // Simulate an error for rollback demonstration 
    if (updates.triggerError) { throw new Error('Simulated update error'); }

    if (!user) return res.status(404).send('User not found');
    res.send(user);
  } catch (err) {
    // Revert to the original document if an error occurs 
    await UserLogin.findOneAndUpdate({ u_id }, originalUserLogin.toObject());

    res.status(400).send(err);
  }
});

// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await UserLogin.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.send('User deleted');
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
      const message = 'User not found'
      return res.status(404).send({ message, ...req.body });
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

// update user password
app.post('/updatePassword', async (req, res) => {
  try {
    const { u_name, password, new_password } = req.body;
    const updates = req.body;

    const user = await UserLogin.findOne({ u_name });
    const { u_id } = user;
    if (!user) {
      const message = 'User not found'
      return res.status(404).send({ message, ...req.body });
    }

    const isMatch = await verifyPassword(password, user.p_hash);
    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }

    let updateFields = updates;
    // If password is being updated, hash the new password 
    if (updates.new_password) {
      const hashedPassword = await hashPassword(updates.new_password);
      updateFields.p_hash = hashedPassword;
      delete updates.password;
    }

    const updateduser = await UserLogin.findOneAndUpdate({ u_id }, updateFields, { new: true, runValidators: true });
    res.send(updateduser);
  } catch (err) {
    res.status(400).send(err);
  }
});


app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;
  sendMail(to, subject, text);
  res.send('Email sent!');
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



