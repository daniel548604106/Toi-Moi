const Chat = require('../models/chatModel');

const loadMessages = async (userId, messagesWith) => {
  try {
    const user = await Chat.findOne({ user: userId }).populate(
      'chats.messagesWith'
    );
    const chat = user.chats.find((chat) => {
      return chat.messagesWith._id.toString() === messagesWith;
    });
    console.log('chats!!', chat);
    if (!chat) return { error: 'No chat found' };
    return { chat };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

module.exports = { loadMessages };
