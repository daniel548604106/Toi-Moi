const express = require('express');
const router = express.Router();
const sendEmail = require('../utilsServer/email');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const isEmail = require('validator/lib/isEmail');

// HTML FILE READER
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

// Check user exists and send email for reset password
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    if (!isEmail(email)) {
      return res.status(401).send('Invalid Email');
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const token = crypto.randomBytes(32).toString('hex');
    const href = `${process.env.BASE_URL}/reset/password?token=${token}`;
    user.resetToken = token;
    user.expireToken = Date.now() + 3600000; // Expire within ten minutes
    await user.save();
    const subject = 'Toi&Moi - Reset Password';

    const html = await readFile(
      path.resolve(__dirname, '../views/resetPassword', 'index.html')
    );

    await sendEmail({ email: user.email, subject, html });

    console.log('successful');
    return res.status('200').send('Email sent successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

// Verify token and reset the password in DB

router.post('/token', async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    if (password.length < 6)
      return res
        .status(401)
        .send('Password length must be at least 6 characters');
    const user = await User.findOne({ resetToken: token });
    if (!user) return res.status(404).send('User not found');
    if (Date.now() > user.expireToken) {
      return res
        .status(401)
        .send('Token expired. Please click on forgot password again');
    }
    user.password = await bcrypt.hash(password, 10);
    user.resetToken = '';
    user.expireToken = undefined;
    await user.save();

    return res.status(200).send('Password updated');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
