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
    profileImage: {
      picUrl: {
        type: String
      },
      postId: {
        type: String
      },
      description: {
        type: String
      }
    },
    profileCoverDescription: {
      type: String
    },
    profileCoverImage: {
      type: String
    },
    profileCoverPostId: {
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
