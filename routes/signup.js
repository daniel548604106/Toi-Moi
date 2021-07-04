const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Notification = require('../models/notificationModel');
const Profile = require('../models/profileModel');
const Friend = require('../models/friendModel');
const Follower = require('../models/followerModel');
const Chat = require('../models/chatModel');
const Search = require('../models/searchModel');
const Saved = require('../models/savedModel');
const Story = require('../models/storyModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isEmail = require('validator/lib/isEmail');

const regexUsername =
  /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
router.get('/:username', async (req, res) => {
  const { username } = req.params;
  try {
    // Test valid input
    if (username.length < 1) return res.status(401).send('Invalid ');
    if (!regexUsername.test(username)) return res.status(401).send('Invalid');
    const user = await User.findOne({ username: username.toLowerCase() });
    // Check if user already exists
    if (user)
      return res.status(401).send('This username has already been taken');

    return res.status(200).send('Available');
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
});

router.post('/', async (req, res) => {
  const {
    name,
    username,
    email,
    birthday,
    gender,
    genderDisplayName,
    password,
    bio
  } = req.body;
  try {
    console.log(req.body);
    if (!email) return res.status(401).send('Please provide email');
    if (!username) return res.status(401).send('Please provide username');
    if (!birthday) return res.status(401).send('Please provide birthday');
    if (!name) return res.status(401).send('Please provide name');
    if (!password) return res.status(401).send('Please provide password');
    if (!gender) return res.status(401).send('Please provide gender');
    if (!isEmail) return res.status(401).send('Invalid Email');
    if (password.length < 6)
      return res.status(401).send('Password must be at least 6 characters');
    let user;
    user = await User.findOne({ email: email.toLowerCase() });
    if (user) return res.status(401).send('User already registered');
    let registeredUsername = await User.findOne({
      username: username.toLowerCase()
    });
    if (registeredUsername)
      return res.status(401).send('Username has already been taken');

    user = new User({
      name,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password,
      profileImage: '',
      gender,
      genderDisplayName
    });
    // 10 is the recommended round
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    // Profile Model

    let profileFields = {
      user: user._id,
      bio: '',
      profileImage: {
        picUrl: '',
        postId: '',
        description: ''
      },
      profileCoverImage: '',
      summary: {
        work_experience: [],
        education: [],
        current_city: {
          city: '',
          country: '',
          still_living: '',
          set_public: true
        },
        hometown: {
          country: '',
          city: '',
          set_public: true
        },
        relationship: {
          set_public: true
        }
      }
    };

    await new Profile(profileFields).save();

    // Story Model
    await new Story({
      user: user._id,
      stories: []
    }).save();

    // Saved Model

    await new Saved({
      user: user._id,
      posts: []
    }).save();

    // Follower Model
    await new Follower({
      user: user._id,
      followers: [],
      following: []
    }).save();

    // Chat Model
    await new Chat({
      user: user._id,
      chats: []
    }).save();

    // Friend Model

    await new Friend({
      user: user._id,
      requestsSent: [],
      requestsReceived: [],
      friends: []
    }).save();

    // Notification Model
    await new Notification({
      user: user._id,
      notifications: []
    }).save();

    // Search Model

    await new Search({
      user: user._id,
      history: []
    }).save();

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

module.exports = router;
