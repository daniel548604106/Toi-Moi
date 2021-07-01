const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notifications: [
    {
      type: {
        type: String,
        enum: [
          'newLike',
          'newComment',
          'newFollower',
          'newFriendInvitation',
          'newFriendAccepted', // newFriendAdded is only set for user who's request has been received.
          'newFriendAdded' // newFriendAdded is only set for user that has already been invited and received the request
        ]
      },
      // The user which this notification has relation to
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      },
      isNotificationRead: {
        type: {
          Boolean
        },
        default: false
      },
      commentId: {
        type: String
      },
      text: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now()
      }
    }
  ]
});

module.exports = mongoose.model('Notification', notificationSchema);
