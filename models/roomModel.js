const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  room_code: {
    type: String,
    required: true
  },
  icon: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  starting_time: {
    type: Date,
    default: Date.now()
  },
  public: {
    type: Boolean,
    default: false
  },
  invited_users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  messages: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      message: {
        type: String
      }
    }
  ]
});

module.exports = mongoose.model('Room', roomSchema);
