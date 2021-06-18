const mongoose = require('mongoose');
const SearchSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  history: [
    {
      type: {
        type: String,
        enum: ['user', 'keyword'],
        default: 'keyword'
      },
      keyword: {
        type: String
      },
      user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
      },
      _id: {
        type: String
      }
    }
  ]
});

module.exports = mongoose.model('Search', SearchSchema);
