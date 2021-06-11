const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const Profile = require('../models/profileModel')
const Follower = require('../models/followerModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const isEmail = require('validator/lib/isEmail')

const regexUsername = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
router.get('/:username', async(req,res) =>{
  const { username } = req.params
  try{
    // Test valid input
    if(username.length < 1) return res.status(401).send('Invalid ')
    if(!regexUsername.test(username)) return res.status(401).send('Invalid')
    const user = await User.findOne({username:username.toLowerCase()})
    // Check if user already exists
    if(user) return res.status(401).send('This username has already been taken')

    return res.status(200).send('Available')
  }catch(error){
    console.log(error)
   return res.status(500).send('Server error')
  }
})


router.post('/', async(req,res) =>{
  const { name, username, email,password, bio, facebook, twitter } = req.body
  try{
    if(!isEmail) return res.status(401).send('Invalid Email')
    if(password.length < 6) return res.status(401).send('Password must be at least 6 characters')
    let user;
    user = await User.findOne({email:email.toLowerCase()})
    if(user)return res.status(401).send('User already registered')
    let registeredUsername = await User.findOne({username: username.toLowerCase()})
    if(registeredUsername) return res.status(401).send('Username has already been taken')
    
    user = new User({
      name,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password,
      profileImage: req.body.profileImage || '',

    })
    // 10 is the recommended round
    user.password = await bcrypt.hash(password, 10)
    await user.save()


    // Profile Model

    let profileFields = {}
    profileFields.user = user._id,
    profileFields.bio = bio,
    profileFields.social = {
      facebook: facebook || '',
      twitter: twitter || ''
    }

    await new Profile(profileFields).save()


    // Follower Model
    await new Follower({
      user: user._id,
      followers: [],
      following: []
    }).save()

    // Send Token to user
    const payload = {userId: user._id}
    await jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: '2d'},(err,token) =>{
      if(err)  throw err;
      res.status(200).json(token)

    })


  }catch(error){
    console.log(error)
    return res.status(500).send('Server error')
  }
})


module.exports = router