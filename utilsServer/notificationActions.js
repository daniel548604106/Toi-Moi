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
// Like Notification
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
// Comment Notification
const newCommentNotification = async (
  postId,
  commentId,
  userId,
  userToNotifyId,
  text
) => {
  try {
    const userToNotify = await Notification.findOne({ user: userToNotifyId });
    console.log(postId, commentId, userId, userToNotifyId, text);
    const newNotification = {
      type: 'newComment',
      post: postId,
      user: userId,
      comment: commentId,
      text,
      date: Date.now()
    };

    await userToNotify.notifications.unshift(newNotification);
    await userToNotify.save();

    await setNotificationToUnread(userToNotifyId);
    return;
  } catch (error) {
    console.log(error);
  }
};

const removeCommentNotification = async ({
  postId,
  commentId,
  userId,
  userToRemoveNotifyId
}) => {
  try {
    const user = await Notification.findOne({ user: userToRemoveNotifyId });
    const notificationToRemove = user.notifications.find(
      (notification) =>
        notification.type === 'newComment' &&
        notification.user.toString() === userId &&
        notification.post.toString() === postId &&
        notification.comment === commentId
    );

    const index = user.notifications
      .map((notification) => notification._id.toString())
      .indexOf(notificationToRemove._id.toString());

    user.notifications.splice(index, 1);
    await user.save();
  } catch (error) {
    console.log(error);
  }
};
// Follower Notification

const newFollowerNotification = async ({ userId, userToNotifyId }) => {
  try {
    const user = await Notification.findOne({ user: userToNotifyId });
    const newNotification = {
      type: 'newFollower',
      user: userId,
      date: Date.now()
    };
    user.notifications.unshif(newNotification);
    await user.save();
    await setNotificationToUnread(userToNotifyId);
    return;
  } catch (error) {
    console.log(error);
  }
};

const removeFollowerNotification = async ({
  userId,
  userToRemoveNotificationId
}) => {
  try {
    const user = await Notification.findOne({
      user: userToRemoveNotificationId
    });
    const notificationToRemove = user.notifications.find(
      (notification) =>
        notification.type === 'newFollower' &&
        notification.user.toString() === userId
    );

    const index = user.notifications
      .map((notification) => notification._id.toString())
      .indexOf(notificationToRemove._id.toString());

    user.notifications.splice(index, 1);
    await user.save();
  } catch (error) {
    console.log(error);
  }
};

// Friend Notification
const newFriendNotification = async ({
  userId,
  userToNotifyId,
  hasBeenInvited
}) => {
  try {
    const user = await Notification.findOne({ user: userToNotifyId });
    const newNotification = {
      type: 'newFriendInvitation',
      user: userId,
      date: Date.now()
    };
    if (hasBeenInvited) {
      newNotification.type = 'newFriendAccepted';
    }

    await user.notifications.unshift(newNotification);
    await user.save();
    await setNotificationToUnread(userToNotifyId);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
};

const removeFriendNotification = async ({
  userId,
  userToRemoveNotificationId
}) => {
  try {
    const user = await Notification.findOne({
      user: userToRemoveNotificationId
    });

    const notificationToRemove = user.notifications.find(
      (notification) =>
        (notification.type === 'newFriendInvitation' ||
          notification.type === 'newFriendAccepted') &&
        notification.user.toString() === userId
    );
    console.log(notificationToRemove, 'remove');
    const indexOf = user.notifications
      .map((notification) => notification._id.toString())
      .indexOf(notificationToRemove._id.toString());
    await user.notifications.splice(indexOf, 1);
    await user.save();
    return;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  newLikeNotification,
  removeLikeNotification,
  newFriendNotification,
  removeFriendNotification,
  newCommentNotification,
  removeCommentNotification,
  newFollowerNotification
};
