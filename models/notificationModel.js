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
        enum: ['newLike', 'newComment', 'newFollower']
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
