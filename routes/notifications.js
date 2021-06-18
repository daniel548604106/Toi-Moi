const express = require('express');
const router = express.Router();
const Notification = require('../models/notificationModel');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/userModel');
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

router.post('/:notificationId/read', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const { notificationId } = req.params;
    const user = await Notification.findOne({ user: userId });
    const notificationToRead = user.notifications.find(
      (notification) =>
        notification._id.toString() === notificationId.toString()
    );
    console.log('notification', notificationToRead);
    user.notifications.find(
      (notification) =>
        notification._id.toString() === notificationToRead._id.toString()
    ).isNotificationRead = true;

    await user.save();

    console.log(notificationToRead, 'read');
    res.status(200).json(notificationToRead);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
