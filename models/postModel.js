const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: {
      type: String,
      required: true
    },
    location: {
      type: String
    },
    picUrl: {
      type: String
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      }
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        text: {
          type: String
        },
        date: {
          type: Date,
          default: Date.now()
        },
        _id: {
          type: String,
          required: true
        },
        likes: [
          {
            user: {
              type: mongoose.Schema.Types.ObjectId
            },
            date: {
              type: Date,
              default: Date.now()
            },
            _id: {
              type: String,
              required: true
            }
          }
        ],
        replies: [
          {
            text: {
              type: String
            },
            user: {
              type: mongoose.Schema.Types.ObjectId
            },
            date: {
              type: Date,
              default: Date.now()
            },
            _id: {
              type: String,
              required: true
            }
          }
        ]
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Post', postSchema);
