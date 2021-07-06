const express = require('express');
const router = express.Router();
const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const user = await Chat.findOne({ user: userId })
      .populate('chats.messagesWith')
      .sort({ 'chats.messages.date': -1 });
    let chatsToBeSent = [];

    // Sending the required data
    if (user.chats.length > 0) {
      chatsToBeSent = await user.chats.map((chat) => ({
        messagesWith: chat.messagesWith._id,
        name: chat.messagesWith.name,
        profileImage: chat.messagesWith.profileImage,
        lastMessage: chat.messages[chat.messages.length - 1].msg,
        date: chat.messages[chat.messages.length - 1].date,
        gender: chat.messagesWith.gender
      }));
    }
    return res.json(chatsToBeSent);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const user = await Chat.findOne({ user: userId });
    const { messages } = user.chats.find(
      (chat) => chat.messagesWith.toString() === req.params.id.toString()
    );
    // console.log(messages);
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
  }
});

router.get('/userInfo/:senderId', authMiddleware, async (req, res) => {
  try {
    const { senderId } = req.params;
    const { name, profileImage, gender } = await User.findById(senderId);
    console.log(name, profileImage, 'senderINfo');
    res.status(200).json({ name, profileImage, gender });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
