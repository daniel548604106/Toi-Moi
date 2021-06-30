const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const uuid = require('uuid').v4;
const Room = require('../models/roomModel');
// Create Room
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const { name, starting_time, icon, public } = req.body;
    console.log(req.body);
    const room = await Room.create({
      user: userId,
      name,
      starting_time,
      public,
      icon,
      room_code: uuid(),
      messages: [],
      invited_users: []
    });

    console.log(room);
    res.status(200).json(room);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

// Invite Users to Join Room

router.post('/', authMiddleware, async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
