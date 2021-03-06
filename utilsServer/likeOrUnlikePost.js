const User = require('../models/userModel');
const Post = require('../models/postModel');
const {
  newLikeNotification,
  removeLikeNotification
} = require('../utilsServer/notificationActions');

const likePost = async (postId, userId) => {
  try {
    const post = await Post.findById(postId);
    if (!post) return { error: 'Post not found' };
    const isLiked =
      post.likes.filter((like) => like.user.toString() === userId).length > 0;
    if (isLiked) return { error: 'Post  liked before' };
    await post.likes.unshift({ user: userId });
    await post.save();
    // when we're liking our own post, no notification will be send
    if (post.user.toString() !== userId) {
      await newLikeNotification(userId, postId, post.user.toString());
    }

    const user = await User.findById(userId);

    const { profileImage, name, username } = user;
    return {
      success: true,
      profileImage,
      name,
      username,
      postByUserId: post.user.toString()
    };
  } catch (error) {
    console.log(error);
    return { error: 'Server error' };
  }
};

const unlikePost = async (postId, userId) => {
  try {
    const post = await Post.findById(postId);
    if (!post) return { error: 'Post not found' };
    console.log(post, 'post');
    const isLiked =
      post.likes.filter((like) => like.user.toString() === userId).length > 0;
    if (!isLiked) return { error: 'Post not liked before' };
    const indexOf = post.likes
      .map((like) => like.user.toString())
      .indexOf(userId);
    await post.likes.splice(indexOf, 1);
    await post.save();
    await removeLikeNotification(userId, postId, post.user.toString());
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: 'Server error' };
  }
};

module.exports = { unlikePost, likePost };
