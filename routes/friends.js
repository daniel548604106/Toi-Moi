const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Friend = require('../models/friendModel');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/recommendations', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    let page = 1;
    let skip = page * 20;
    const list = await User.find(
      {},
      { username: 1, _id: 1, name: 1, profileImage: 1, gender: 1 }
    ).limit(20);

    const user = await Friend.findOne({ user: userId });

    // Remove already requested
    let requested = user.requestsSent.map((request) => request.user.toString());
    let recommendations = list.filter(
      (item) => !requested.includes(item._id.toString())
    );
    res.status(200).json(recommendations);
  } catch (error) {
    console.log(error);
    res.status(500).send('server error');
  }
});

// Get Birthday Lists
router.get('/birthdays', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const user = await Friend.findOne({ user: userId }).populate(
      'friends.user'
    );
    const friends = user.friends.map((friend) => {
      return {
        birthday: friend.user.birthday,
        username: friend.user.username,
        profileImage: friend.user.profileImage,
        name: friend.user.name,
        gender: friend.user.gender,
        _id: friend.user._id
      };
    });
    console.log(friends);
    res.status(200).json(friends);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

// Get Received Friend Request
router.get('/received', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const { requestsReceived } = await Friend.findOne({
      user: userId
    }).populate('requestsReceived.user');
    res.status(200).json(requestsReceived);
  } catch (error) {
    console.log(error);
  }
});

// Get Friend List
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const { friends } = await Friend.findOne({ user: userId }).populate(
      'friends.user'
    );
    console.log('friends', friends);
    res.status(200).json(friends);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

// Get Searched Friend
router.get(`/search/:searchedName`, authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const { searchedName } = req.params;
    // options i means it's not case sensitive

    let regex = new RegExp(`/${searchedName}/i`, 'g');
    const { friends } = await Friend.findOne({ user: userId }).populate(
      'friends.user'
    );

    const results = friends.map((friend) => regex.test(friend.user.name));
    console.log(friends, searchedName, results);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
