const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Follower = require('../models/followerModel');
const Chat = require('../models/chatModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isEmail = require('validator/lib/isEmail');

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(email, password);
    if (!isEmail(email)) return res.status(401).send('Invalid Email');
    if (password.length < 6)
      return res.status(401).send('Password must be at least 6 characters');

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      '+password'
    );

    // If user is not found , we set send to invalid credentials instead of specifying what's wrong
    if (!user) return res.status(401).send('Invalid Credentials');

    // Comparing the password input to the hashed password that's saved in DB
    const isPassword = await bcrypt.compare(password, user.password);

    // Password Validation
    if (!isPassword) return res.status(401).send('Invalid Credentials');

    // Chat Model
    const chat = await Chat.findOne({ user: user._id });
    if (!chat) {
      await new Chat({
        user: user._id,
        chats: []
      }).save();
    }

    // Send Token to user
    const payload = { userId: user._id };
    await jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '2d' },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ user, token });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
});

router.get('/', (req, res) => {
  console.log('hi');
  res.send('hi');
});

module.exports = router;
