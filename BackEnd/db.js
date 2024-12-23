const mongoose = require('mongoose');

// MongoDB connection string
const uri = 'mongodb://localhost:27017/emp_management'; // Replace 'mydatabase' with your database name

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

module.exports = mongoose;

//localhost:27017/emp_management/emp_basic