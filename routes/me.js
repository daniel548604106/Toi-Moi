const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const authMiddleware = require('../middleware/authMiddleware.js');
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
