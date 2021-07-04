const mongoose = require('mongoose');

const savedSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    posts: [
      {
        type: {
          type: String,
          enum: ['post', 'link', 'video'],
          default: 'post'
        },
        post: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Post'
        },
        publisher: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Saved', savedSchema);
