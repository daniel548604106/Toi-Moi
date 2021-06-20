const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    gender: {
      type: String,
      required: true,
      enum: ['female', 'male', 'other']
    },
    password: {
      type: String,
      required: true,
      // By setting select to false, when we search for a user in the backend , won't show password field by default
      select: false
    },
    birthday: {
      type: Date,
      default: Date.now()
    },
    username: {
      type: String,
      required: true,
      unique: [true, 'Username has already been taken'],
      trim: true
    },
    profileImage: {
      type: String
    },
    newMessagePopup: {
      type: Boolean,
      default: true
    },
    unreadMessage: {
      type: Boolean,
      default: false
    },
    unreadNotification: {
      type: Boolean,
      default: false
    },
    role: [
      {
        type: String,
        default: 'user',
        enum: ['user', 'root']
        // enum is saying that only the fields specified are allowed
      }
    ],
    resetToken: {
      type: String
    },
    // the token that we are sending to the user for password reset is only valid for 1 hour
    expireToken: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', UserSchema);
