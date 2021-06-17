const Friend = require('../models/friendModel');

const checkFriendStatus = async ({ userId, recipientId }) => {
  try {
    const user = await Friend.findOne({ user: userId });
    const recipient = await Friend.findOne({ user: recipientId });

    isUserFriended = user.requestsReceived.find(
      (request) => request.user.toString() === recipientId.toString()
    );

    isRecipientFriended = recipient.requestsReceived.find(
      (request) => request.user.toString() === userId.toString()
    );

    console.log(
      'hihi',
      userId,
      recipientId,
      isUserFriended,
      isRecipientFriended
    );

    if (isUserFriended && isRecipientFriended) {
      user.friends.unshift({ user: recipientId });
      recipient.friends.unshift({ user: userId });
      await user.save();
      await recipient.save();
      console.log('friended');
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { checkFriendStatus };
