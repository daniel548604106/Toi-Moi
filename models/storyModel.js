const mongoose = require('mongoose');
const User = require('./userModel');
const storySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    stories: [
      {
        createdAt: {
          type: Date,
          default: Date.now()
        },
        images: [
          {
            image: {
              type: String,
              required: true
            }
          },
          {
            type: {
              type: String,
              enum: ['video', 'image', 'text']
            }
          },
          {
            taggedUsers: [
              {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Story', storySchema);
