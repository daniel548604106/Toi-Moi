const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  uploadProfileCoverImage,
  uploadProfileImage
} = require('../middleware/uploadMiddleware');
const router = express.Router();
const User = require('../models/userModel');
const Profile = require('../models/profileModel');
const Follower = require('../models/followerModel');
const Friend = require('../models/friendModel');
const Post = require('../models/postModel');
const { checkFriendStatus } = require('../utilsServer/friendsAction');
const {
  newFollowerNotification,
  removeFollowerNotification,
  newFriendNotification,
  removeFriendNotification
} = require('../utilsServer/notificationActions');
// Get Profile info

router.get('/:username', authMiddleware, async (req, res) => {
  const { username } = req.params;
  try {
    const { userId } = req;
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) return res.status(404).send('User not found');
    // console.log(user);

    const profile = await Profile.findOne({ user: user._id }).populate('user');
    const friends = await Friend.findOne({ user: user._id });

    // console.log(profile);
    const profileFollowStats = await Follower.findOne({ user: user._id });
    // console.log(profileFollowStats);
    res.status(200).json({
      profile,
      total_friends: friends.friends.length,
      followersLength:
        profileFollowStats.followers.length > 0
          ? profileFollowStats.followers.length
          : 0,
      followingLength:
        profileFollowStats.following.length > 0
          ? profileFollowStats.following.length
          : 0
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

// Get User's posts
router.get('/posts/:username', authMiddleware, async (req, res) => {
  try {
    const { username } = req.params;
    const page = Number(req.query.page) || 1;
    const size = 5;
    const skips = size * (page - 1);

    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) return res.status(404).send('User not found');
    const posts = await Post.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate('user')
      .populate('comments.user')
      .limit(size)
      .skip(skips);

    if (!posts) return res.status(404).send('Posts not found');
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

// Get Followers

router.get('/followers/:username', authMiddleware, async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) return res.status(404).send('User not found');
    const followersData = await Follower.findOne({ user: user._id }).populate(
      'followers.user'
    );
    res.status(200).json(followersData.followers);
  } catch (error) {
    console.log(error);
  }
});

// Get Following

router.get('/following/:username', authMiddleware, async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) return res.status(404).send('User not found');
    const followersData = await Follower.findOne({ user: user._id }).populate(
      'following.user'
    );
    res.status(200).json(followersData.following);
  } catch (error) {
    console.log(error);
  }
});

// Follow a user
router.post('/follow/:userToFollowId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const { userToFollowId } = req.params;
    // console.log(userToFollowId);
    const user = await Follower.findOne({ user: userId });
    const userToFollow = await Follower.findOne({ user: userToFollowId });
    if (!user) return res.status(404).send('User not found');
    if (!userToFollow) return res.status(404).send('User to follow not found');
    // Check if user has already followed
    const isFollowing =
      user.following.length > 0 &&
      user.following.filter(
        (following) => following.user.toString() === userToFollowId
      ).length > 0;

    if (isFollowing) return res.status(401).send('User already followed');

    userToFollow.followers.unshift({ user: userId });
    await userToFollow.save();
    user.following.unshift({ user: userToFollowId });
    await user.save();

    await newFollowerNotification(userId, userToFollowId);
    res.status(200).send('Success');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

// UnFollow a user
router.post('/unfollow/:userToUnfollowId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const { userToUnfollowId } = req.params;
    const user = await Follower.findOne({ user: userId });
    const userToUnfollow = await Follower.findOne({ user: userToUnfollowId });

    if (!user || !userToUnfollowId)
      return res.status(404).send('User not found');

    // Check if it wasn't even followed
    const isFollowing =
      user.following.length > 0 &&
      user.following.filter(
        (following) => following.user.toString() === userToUnfollowId
      ).length > 0;

    if (!isFollowing) return res.status(401).send('User not followed');

    // User who wants to unfollow

    const indexOfFollowing = user.following
      .map((following) => following.user)
      .indexOf(userToUnfollowId);

    await user.following.splice(indexOfFollowing, 1);

    // User who is unfollowed

    const indexOfFollower = userToUnfollow.followers
      .map((follower) => follower.user)
      .indexOf(userId);

    await userToUnfollow.followers.splice(indexOfFollower, 1);

    await user.save();
    await userToUnfollow.save();

    await removeFollowerNotification(userId, userToUnfollowId);
    res.status(200).send('Unfollow successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

// Get Friends
router.get('/friends/:username', authMiddleware, async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) return res.status(404).send('User not found');
    const { friends } = await Friend.findOne({ user: user._id }).populate(
      'friends.user'
    );
    res.status(200).json(friends);
  } catch (error) {
    console.log(error);
  }
});

// Send friend request
router.post('/friend/:username', authMiddleware, async (req, res) => {
  try {
    const { username } = req.params;
    const { userId } = req;
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) res.status(404).send('User not found');
    const userToReceiveRequest = await Friend.findOne({
      user: user._id.toString()
    });
    const userToSendRequest = await Friend.findOne({
      user: userId
    });

    // Check if request has already been sent
    if (
      userToSendRequest.requestsSent.find(
        (request) => request.user.toString() === user._id.toString()
      )
    ) {
      return res.status(401).send('Request already sent');
    }

    // Check if the user himself has already received request from the userToReceiveRequest

    let hasBeenInvited;
    hasBeenInvited =
      userToSendRequest.requestsReceived.filter(
        (received) => received.user.toString() === user._id.toString()
      ).length > 0;

    // Receive
    userToReceiveRequest.requestsReceived.unshift({ user: userId });
    await userToReceiveRequest.save();

    // Request
    userToSendRequest.requestsSent.unshift({ user: user._id });
    await userToSendRequest.save();

    console.log(1, 'saved');
    await checkFriendStatus({ userId: userId, recipientId: user._id });
    await newFriendNotification({
      userId,
      userToNotifyId: user._id,
      hasBeenInvited
    });
    res.status(200).send('Request Sent');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

// Remove friend request
router.post('/unfriend/:username', authMiddleware, async (req, res) => {
  try {
    const { username } = req.params;
    const { userId } = req;
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) res.status(404).send('User not found');
    const userToRemoveReceived = await Friend.findOne({
      user: user._id.toString()
    });
    const userToRemoveRequest = await Friend.findOne({
      user: userId
    });

    // Check if request has already been sent

    const isRequestSent =
      userToRemoveReceived.requestsReceived.length > 0 &&
      userToRemoveReceived.requestsReceived.filter(
        (request) => request.user.toString() === user._id
      );
    if (!isRequestSent) return res.status(401).send('Request not sent before');

    // Check if the user himself has already received request from the userToReceiveRequest

    // Receive
    const index = userToRemoveReceived.requestsReceived
      .map((received) => received.user.toString())
      .indexOf(userId.toString());
    userToRemoveReceived.requestsReceived.splice(index, 1);
    // Remove from friend list
    const indexOfFriends = userToRemoveReceived.friends
      .map((friend) => friend.user.toString())
      .indexOf(userId.toString());
    userToRemoveReceived.friends.splice(indexOfFriends, 1);
    await userToRemoveReceived.save();

    // Request
    const indexOfRequestToRemove = userToRemoveRequest.requestsSent
      .map((sent) => sent.user.toString())
      .indexOf(user._id.toString());

    userToRemoveRequest.requestsSent.splice(indexOfRequestToRemove, 1);

    // Remove from friend list
    const indexOfFriendsFromRequestedUser = userToRemoveRequest.friends
      .map((friend) => friend.user.toString())
      .indexOf(user._id.toString());
    userToRemoveReceived.friends.splice(indexOfFriendsFromRequestedUser, 1);

    await userToRemoveReceived.save();
    await userToRemoveRequest.save();
    await removeFriendNotification({
      userId,
      userToRemoveNotificationId: user._id
    });
    res.status(200).send('Request removed');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

// Reject friend request
router.post('/reject/:username', authMiddleware, async (req, res) => {
  try {
    const { username } = req.params;
    const { userId } = req;
    const user = await User.findOne({ username: username.toLowerCase() });
    // Rejected User
    const rejectedUser = await Friend.findOne({ user: user._id });
    const indexOfRejected = rejectedUser.requestsSent
      .map((sent) => sent.user.toString())
      .indexOf(userId.toString());
    await rejectedUser.requestsSent.splice(indexOfRejected, 1);
    await rejectedUser.save();
    // Rejecter
    const rejecter = await Friend.findOne({ user: userId });
    const index = rejecter.requestsReceived
      .map((received) => received.user.toString())
      .indexOf(user._id.toString());
    await rejecter.requestsReceived.splice(index, 1);
    await rejecter.save();

    // Remove Notification for rejecter
    await removeFriendNotification({
      userId: user._id,
      userToRemoveNotificationId: userId
    });
    res.status(200).send('Rejected successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

// Get friends List Preview

router.get('/friends_preview/:username', authMiddleware, async (req, res) => {
  try {
    const { username } = req.params;
    const { userId } = req;

    const user = await User.findOne({ username: username.toLowerCase() });
    const friends = await Friend.findOne({ user: user._id }).populate(
      'friends.user'
    );
    // console.log(friends);
    const requestedByGuest =
      friends.requestsSent
        .map((request) => request.user.toString())
        .indexOf(userId) > -1;
    const receivedFromGuest =
      friends.requestsReceived
        .map((received) => received.user.toString())
        .indexOf(userId) > -1;
    let friend_status = 'unfriend';
    if (requestedByGuest) {
      friend_status = 'friendInvited';
    }
    if (receivedFromGuest) {
      friend_status = 'friendRequested';
    }
    if (requestedByGuest && receivedFromGuest) {
      friend_status = 'friend';
    }
    const list = {
      friends_total: friends.friends.length,
      friends_preview: friends.friends.slice(0, 9),
      friend_status // friended, requested,received,unfriend
    };

    return res.status(200).json(list);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Serve error');
  }
});

// Update Cover Image

router.patch(
  '/:username',
  authMiddleware,
  uploadProfileCoverImage,
  async (req, res) => {
    try {
      const { userId } = req;
      const { username } = req.params;
      const {
        bio,
        profileCoverDescription,
        profileCoverPostId,
        profileCoverImage
      } = req.body;
      console.log('body', req.body);
      const user = await Profile.findOne({ user: userId }).populate('user');
      console.log('user', user);
      if (user.user.username !== username)
        return res.status(401).send('Invalid Credentials');

      // Updating Cover Image
      if (profileCoverImage) {
        user.bio = bio;
        console.log('should', profileCoverImage);
        user.profileCoverDescription = profileCoverDescription;
        user.profileCoverImage = profileCoverImage;
        user.profileCoverPostId = profileCoverPostId;
        console.log('before save', user);
      } else {
        user.bio = bio;
      }

      await user.save();

      // Send as a post

      console.log('after save', user);
      return res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  }
);

// Update Profile Image

router.patch(
  '/:username/profile_image',
  authMiddleware,
  uploadProfileImage,
  async (req, res) => {
    try {
      const { userId } = req;
      const { username } = req.params;
      const { profileImageDescription, profileImagePostId, profileImage } =
        req.body;
      console.log('body', req.body);
      const userProfile = await Profile.findOne({ user: userId }).populate(
        'user'
      );
      console.log('userProfile', userProfile);
      if (userProfile.user.username !== username)
        return res.status(401).send('Invalid Credentials');

      // Updating Profile
      userProfile.profileImage = {
        picUrl: profileImage,
        postId: profileImagePostId,
        description: profileImageDescription
      };
      await userProfile.save();
      console.log('profile saved');

      // Updating User

      const user = await User.findOne({ username: username.toLowerCase() });
      user.profileImage = profileImage;

      await user.save();
      console.log('user saved', user);
      return res.status(201).json(userProfile);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  }
);

// Add Work Experience
router.post('/:username/work_experience', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const { username } = req.params;
    const { experience } = req.body;
    const user = await Profile.findOne({ user: userId }).populate('user');
    if (user.user.username !== username)
      return res.status(401).send('Unauthorized');

    user.summary.work_experience.unshift(experience);
    await user.save();
    res.status(200).json(user.summary);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
