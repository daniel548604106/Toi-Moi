const Chat = require('../models/chatModel');
const User = require('../models/userModel');
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

const sendMessage = async (userId, messageSentTo, msg) => {
  try {
    // Sender ( Logged In User)
    const sender = await Chat.findOne({ user: userId });

    const newMessage = {
      sender: userId,
      receiver: messageSentTo,
      msg,
      date: Date.now()
    };

    // Check if they had chatted before

    const previousChat = sender.chats.find(
      (chat) => chat.messagesWith.toString() === messageSentTo
    );

    if (previousChat) {
      previousChat.messages.push(newMessage);
      await sender.save();
    } else {
      const newChat = {
        messagesWith: messageSentTo,
        messages: [{ ...newMessage }]
      };
      sender.chats.unshift(newChat);
      await sender.save();
    }

    // Receiver
    const receiver = await Chat.findOne({ user: messageSentTo });

    // Check if they had chatted before

    const previousChatForReceiver = receiver.chats.find(
      (chat) => chat.messagesWith.toString() === userId
    );

    if (previousChatForReceiver) {
      previousChatForReceiver.messages.push(newMessage);
      await receiver.save();
    } else {
      const newChat = {
        messagesWith: userId,
        messages: [{ ...newMessage }]
      };
      receiver.chats.unshift(newChat);
      await receiver.save();
    }

    return { newMessage };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const setMessageToUnread = async (userId) => {
  try {
    console.log('setUnread');
    const user = await User.findById(userId);
    if (!user.unreadMessage) {
      user.unreadMessage = true;
    }
    await user.save();
    return;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { loadMessages, sendMessage, setMessageToUnread };
