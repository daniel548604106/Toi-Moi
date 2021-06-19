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
    summary: {
      work_experience: [
        {
          company_name: {
            type: String
          },
          job_title: {
            type: String
          },
          still_working: {
            type: Boolean
          },
          set_public: {
            type: Boolean,
            default: true
          }
        }
      ],
      education: [
        {
          school_name: {
            type: String
          },
          faculty_name: {
            type: String
          },
          still_studying: {
            type: Boolean
          },
          set_public: {
            type: Boolean,
            default: true
          }
        }
      ],
      current_city: {
        city: {
          type: String
        },
        country: {
          type: String
        },
        still_living: {
          type: String
        },
        set_public: {
          type: Boolean,
          default: true
        }
      },
      hometown: {
        country: {
          type: String
        },
        city: {
          type: String
        },
        set_public: {
          type: Boolean,
          default: true
        }
      },
      relationship: {
        status: {
          type: String,
          enum: ['single', 'complicated', 'married', 'relationship']
        },
        set_public: {
          type: Boolean,
          default: true
        }
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
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Profile', ProfileSchema);
