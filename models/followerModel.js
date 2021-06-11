const mongoose = require('mongoose')

const FollowerSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  followers:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  following:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})


module.exports = mongoose.model('Follower',FollowerSchema)