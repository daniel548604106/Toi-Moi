const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const User = require('../models/userModel');
const Profile = require('../models/profileModel');
const Follower = require('../models/followerModel');
const Post = require('../models/postModel');
// Get Profile info

router.get('/:username', authMiddleware, async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) return res.status(404).send('User not found');
    console.log(user);

    const profile = await Profile.findOne({ user: user._id }).populate('user');

    console.log(profile);
    const profileFollowStats = await Follower.findOne({ user: user._id });
    console.log(profileFollowStats);
    res.status(200).json({
      profile,
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
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) return res.status(404).send('User not found');
    const posts = await Post.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate('user')
      .populate('comments.user');
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
    console.log(userToFollowId);
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
    res.status(200).send('Success');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

// Unfollow a user
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
    res.status(200).send('Unfollow successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
