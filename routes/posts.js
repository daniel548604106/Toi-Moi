const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');
const User = require('../models/userModel');
const authMiddleware = require('../middleware/authMiddleware');
const { uploadPostImage } = require('../middleware/uploadMiddleware');

// Get All Posts

router.get('/', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('user')
      .populate('comments.user')
      .populate('likes.user');

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

// Get Post By Id
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send('Post not found');

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

// Create Post

router.post('/', authMiddleware, uploadPostImage, async (req, res) => {
  try {
    const { text, location, picUrl } = req.body;
    if (text.length < 1)
      return res.status(401).send('Text must be at least on characters');

    const newPost = {
      user: req.userId,
      text,
      likes: [],
      comments: []
    };
    if (location) newPost.location = location;
    if (picUrl) newPost.picUrl = picUrl;

    const post = await new Post(newPost).save();

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

// Delete Post

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send('Post not found');

    // We are trying to verify if the user who wants to delete the post is the author
    const user = await User.findById(userId);
    if (post.user.toString() !== userId) {
      if (user.role === 'root') {
        // So if we as the admin want to delete unnecessary posts, we could do that
        await post.remove();
        return res.status(200).send('Post successfully deleted');
      } else {
        return res.status(401).send('Unauthorized');
      }
    }
    await post.remove();
    return res.status(200).send('Post successfully deleted');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

// Like a Post

router.post('/like/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send('No post found');

    const isLiked =
      post.likes.filter((like) => like.user.toString() === userId).length > 0;
    if (isLiked) {
      return res.status(401).send('Post already liked');
    }

    post.likes.unshift({ user: userId });

    await post.save();
    res.status(200).send('Post liked');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

// Unlike a Post

router.post('/unlike/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send('No post found');
    const isLiked =
      post.likes.filter((like) => like.user.toString() === userId).length === 0;
    if (isLiked) {
      res.status(401).send('Post not liked before');
    }

    const index = post.likes
      .map((like) => like.user.toString())
      .indexOf(userId);
    await post.likes.splice(index, 1);

    await post.save();
    res.status(200).send('Post liked');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

// Get all likes of a post
router.get('/like/:id', authMiddleware, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate('likes.user');
    if (!post) return res.status(404).send('Post not found');

    res.status(200).json(post.likes);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
