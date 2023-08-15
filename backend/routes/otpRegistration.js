const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const otpRouter = express.Router();
const { User } = require('../models/dataList');

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'addison37@ethereal.email',
    pass: 'uZB6u1JZjRAXf6WsT8',
  },
});

otpRouter.post('/otp', async function (req, res) {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const username = 'saurabh@gmail.com'//req.body.username; // consider email as username
  const pass = '1234'//req.body.pass;
  const address = req.body.address;
  const city = req.body.city;
  const state = req.body.state;
  const country = req.body.country;

  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hashed_pass = await bcrypt.hash(pass, salt);

    const isUserExist = await User.findOne({ Email: username });
    if (isUserExist) {
      console.log('User exists');
      res.status(400).send('User already exists');
      return;
    } else {
      const otp = generateOTP();
      const verificationLink = `http://localhost:8080/verify?otp=${otp}&email=${username}`;
      console.log("========",otp)
      // Send the verification email to the user's email address
      const mailOptions = {
        from: 'saurabh@futurestacksolution.in', // Sender's email address
        to: username, // User's email address
        subject: 'Email Verification',
        html: `<p>Please click the following link to verify your email:</p>
          <a href="${verificationLink}">${verificationLink}</a>`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).send('Error sending email');
        } else {
          console.log('Email sent:', info.response);
          // Save the user details and respond with success
          const userObject = new User({
            Name: 'name',
            LastName: 'lastname',
            Email: username,
            Address: 'address',
            Country: 'country',
            State: 'state',
            City: 'city',
            Hash_password: hashed_pass,
            OTP: otp, // Store the OTP in the User object
          });
          userObject.save();
          res.send('Verification email sent');
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred');
  }
});

otpRouter.post('/verify', async function (req, res) {
  const username = 'saurabh@gmail.com'//req.body.username;
  const otp = '963468'//req.body.otp;

  try {
    const user = await User.findOne({ Email: username });
    console.log(user)
    if (!user) {
      console.log('User not found from otp verify');
      res.status(400).send('hello ');
      return;
    }

    if (user.OTP === otp) {
      // OTP is verified successfully
      // Proceed with registration or perform any additional steps if needed

      // Clear the OTP field in the User object
      user.OTP = undefined;
      await user.save();

      res.send('OTP verification successful. User registered successfully.');
    } else {
      console.log('Invalid OTP');
      res.status(400).send('Invalid OTP');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred');
  }
});

module.exports = otpRouter;
