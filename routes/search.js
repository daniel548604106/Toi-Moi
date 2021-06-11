const express = require('express')
const router = express.Router()
const authMiddleware  = require('../middleware/authMiddleware')
const User = require('../models/userModel')



router.get('/:searchText', async(req,res) =>{
  try{
    const { searchText} = req.params 
    console.log(searchText)
    if(searchText.length === 0) return
    let userPattern = new RegExp(`^${searchText}`)
    // options i means it's not case sensitive
    const results = await User.find({name: {$regex: userPattern, $options: 'i'},})
    res.json(results)
  }catch(error){
    console.log(error)
    res.status(500).send('Server Error')
  }
})


module.exports = router