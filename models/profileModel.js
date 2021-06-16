const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    bio: {
      type: String
    },
    profileCoverImage: {
      type: String
    },
    social: {
      facebook: {
        type: String
      },
      twitter: {
        type: String
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Profile', ProfileSchema);
