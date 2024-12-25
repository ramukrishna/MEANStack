const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'r.ramakrishnannadar@gmail.com', // Your email
    pass: 'Jairam@120282'   // Your email password or app-specific password
  }
});

// Function to send an email
const sendMail = (to, subject, text) => {
  const mailOptions = {
    from: 'r.ramakrishnannadar@gmail.com', // Your email
    to: to,                       // Recipient email
    subject: subject,             // Email subject
    text: text                    // Email content
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
};

module.exports = sendMail;
