const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    // Whose chat model it is
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    chats: [
      {
        messagesWith: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        messages: [
          {
            msg: {
              type: String,
              required: true
            },
            sender: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User'
            },
            receiver: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User'
            },
            date: {
              type: Date
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

module.exports = mongoose.model('Chat', chatSchema);
