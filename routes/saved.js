const express = require('express');
const router = express.Router();
const Saved = require('../models/savedModel');
const authMiddleware = require('../middleware/authMiddleware');
// Get All Saved Posts

router.get('/posts', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const savedPosts = await Saved.findOne({ user: userId })
      .populate('user')
      .populate('posts.publisher')
      .populate('posts.post');
    res.status(200).json(savedPosts);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

// Create Saved Post
router.post('/posts/post', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const { type = 'post', postId, publisherId } = req.body;
    const savedPosts = await Saved.findOne({ user: userId });
    const newSavedPost = {
      type,
      post: postId,
      publisher: publisherId
    };
    savedPosts.posts.unshift(newSavedPost);
    await savedPosts.save();
    res.status(200).send('Saved Successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

// Delete saved post
router.post('/posts/delete/:postId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const { postId } = req.params;
    const user = await Saved.findOne({ user: userId });
    const index = user.posts
      .map((post) => post.post.toString())
      .indexOf(postId.toString());
    user.posts.splice(index, 1);
    await user.save();
    res.status(200).send('Deleted Successfully');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
