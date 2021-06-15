const User = require('../models/userModel');
const Notification = require('../models/notificationModel');

const setNotificationToUnread = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user.unreadNotification) {
      user.unreadNotification = true;
      await user.save();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

const newLikeNotification = async (userId, postId, userToNotifyId) => {
  try {
    const userToNotify = await Notification.findOne({ user: userToNotifyId });
    const newNotification = {
      type: 'newLike',
      user: userId,
      post: postId,
      date: Date.now()
    };
    console.log('here', userToNotify);
    userToNotify.notifications.unshift(newNotification);
    await userToNotify.save();
    await setNotificationToUnread(userToNotifyId);
    return;
  } catch (error) {
    console.log(error);
  }
};

const removeLikeNotification = async (userId, postId, userToNotifyId) => {
  try {
    const userToRemoveNotification = await Notification.find(userToNotifyId);
    const notificationToRemove = userToRemoveNotification.notifications.find(
      (notification) =>
        notification.type === 'newLike' &&
        notification.post.toString() === postId &&
        notification.user.toString() === userId
    );
    const index = userToRemoveNotification.notifications
      .map((notification) => notification._id.toString())
      .indexOf(notificationToRemove._id.toString());

    await userToRemoveNotification.notifications.splice(index, 1);
    await userToRemoveNotification.save();
    return;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { newLikeNotification, removeLikeNotification };
