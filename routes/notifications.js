const express = require('express');
const router = express.Router();
const Notification = require('../models/notificationModel');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const user = await Notification.findOne({ user: userId })
      .populate('notifications.user')
      .populate('notifications.post');
    console.log('heree', userId, user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (user.unreadNotification) {
      user.unreadNotification = false;
    }
    await user.save();
    return res.status(200).send('Updated');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
