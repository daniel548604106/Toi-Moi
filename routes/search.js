const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/userModel');
const Search = require('../models/searchModel');
const uuid = require('uuid').v4;

router.get('/:searchText', async (req, res) => {
  try {
    const { searchText } = req.params;
    console.log(searchText);
    if (searchText.length === 0) return;
    let userPattern = new RegExp(`^${searchText}`);
    // options i means it's not case sensitive
    const results = await User.find({
      name: { $regex: searchText, $options: 'i' }
    });
    // console.log(results);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});
// Add keyword history
router.post('/keyword', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const { keyword } = req.body;
    console.log('keyword', keyword);
    const user = await Search.findOne({ user: userId.toString() });
    const newSearch = {
      keyword,
      type: 'keyword',
      _id: uuid()
    };
    console.log(user);
    user.history.unshift(newSearch);
    await user.save();

    res.status(200).send('Search history added');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});
// Get recent history
router.get('/history/recent', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const user = await Search.findOne({ user: userId }).populate(
      'history.user'
    );
    const history = user.history.slice(0, 8);
    res.status(200).json(history);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

// Get All History with limits
router.get('/history/all', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const user = await Search.findOne({ user: userId });
    const history = user.history;
    res.status(200).json(history);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});
// Add Search User
router.post('/user', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const { username } = req.body;
    const searchedUser = await User.findOne({ username });
    const user = await Search.findOne({ user: userId });

    const newSearch = {
      type: 'user',
      user: searchedUser._id,
      _id: uuid()
    };

    user.history.unshift(newSearch);
    await user.save();
    res.status(200).send('Searched User saved');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

// Remove search
router.post('/history', authMiddleware, async (req, res) => {
  try {
    console.log(123123);
    const { userId } = req;
    const { historyId } = req.body;
    const user = await Search.findOne({ user: userId });
    console.log(user, userId, historyId);
    const historyToRemoveId = user.history.find(
      (history) => history._id === historyId
    )._id;
    console.log(historyToRemoveId);
    const index = user.history
      .map((history) => history._id)
      .indexOf(historyToRemoveId);
    console.log(index);
    user.history.splice(index, 1);
    await user.save();
    res.status(200).send('History deleted');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
