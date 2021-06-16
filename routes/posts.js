const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');
const User = require('../models/userModel');
const Follower = require('../models/followerModel');
const authMiddleware = require('../middleware/authMiddleware');
const { uploadPostImage } = require('../middleware/uploadMiddleware');
const uuid = require('uuid').v4;

const {
  removeLikeNotification,
  newLikeNotification,
  removeCommentNotification,
  newCommentNotification
} = require('../utilsServer/notificationActions');

// Get All Posts

router.get('/', authMiddleware, async (req, res) => {
  const page = req.query.page || 1;

  try {
    const currentPage = Number(page);
    const size = 5;
    const skips = size * (page - 1);
    const { userId } = req;
    // Since we only need the users we are following , deselect followers
    const loggedUser = await Follower.findOne({ user: userId }).select(
      '-followers'
    );

    let posts = [];
    if (currentPage === 1) {
      if (loggedUser.following.length > 0) {
        posts = await Post.find({
          //The $in operator selects the documents where the value of a field equals any value in the specified array.
          user: {
            $in: [
              userId,
              ...loggedUser.following.map((following) => following.user)
            ]
          }
        })
          .limit(size)
          .sort({ createdAt: -1 })
          .populate('user')
          .populate('comments.user');
      } else {
        posts = await Post.find({ user: userId })
          .limit(size)
          .sort({ createdAt: -1 })
          .populate('user')
          .populate('comments.user');
      }
    } else {
      if (loggedUser.following.length > 0) {
        posts = await Post.find({
          user: {
            $in: [
              userId,
              ...loggedUser.following.map((following) => following.user)
            ]
          }
        })
          .skip(skips)
          .limit(size)
          .sort({ createdAt: -1 })
          .populate('user')
          .populate('comments.user');
      } else {
        posts = await Post.find({ user: userId })
          .skip(skips)
          .limit(size)
          .sort({ createdAt: -1 })
          .populate('user')
          .populate('comments.user');
      }
    }

    //   // Loop through every user that the loggedIn user is following and see if there's any posts made by them
    //   for (let i = 0; i < loggedInUser.following.length; i++) {
    //     const postsFound = posts.filter(
    //       (post) =>
    //         post.user.toString()._id === loggedInUser.following[i].user ||
    //         post.user._id.toString() === userId
    //     );
    //     if (postsFound.length > 0) postsToBeSent.push(...foundPosts);
    //   }
    // }

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
    console.log(req.userId);
    const newPost = {
      user: req.userId,
      text,
      likes: [],
      comments: []
    };
    if (location) newPost.location = location;
    if (picUrl) newPost.picUrl = picUrl;

    const post = await new Post(newPost).save();

    return res.status(200).json(post._id);
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

    const userToNotifyId = post.user;
    if (post.user.toString() !== userToNotifyId) {
      await newLikeNotification(userId, postId, userToNotifyId);
    }
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

    if (post.user.toString() !== userId) {
      await removeLikeNotification(userId, postId, post.user.toString());
    }
    res.status(200).send('Post unliked');
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

// Comment on a post

router.post('/comment/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;
    console.log(req.body);
    const { text } = req.body;
    if (text.length < 1)
      return res.status(401).send('Should be at least 1 characters');

    const post = await Post.findById(postId);
    if (!post) return res.status(404).send('Post not found');

    const user = await User.findById(userId);
    const newComment = {
      _id: uuid(),
      text,
      user,
      date: Date.now(),
      likes: [],
      replies: []
    };

    await post.comments.unshift(newComment);

    await post.save();
    console.log(postId, newComment._id, userId, post.user.toString(), text);
    if (post.user.toString() !== userId) {
      await newCommentNotification(
        postId,
        newComment._id,
        userId,
        post.user.toString(),
        text
      );
    }
    return res.status(200).json(newComment);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

// Delete a comment

router.delete('/:postId/:commentId', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { postId, commentId } = req.params;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send('Post not found');

    const comment = await post.comments.find(
      (comment) => comment._id === commentId
    );
    if (!comment) return res.status(404).send('Comment not found');

    const user = await User.findById(userId);
    // Index of the comment
    const index = post.comments
      .map((comment) => comment._id)
      .indexOf(commentId);

    if (comment.user.toString() !== userId) {
      if (user.role === 'root') {
        await post.comments.splice(index, 1);
        await post.save();
        return res.status(200).send('Comment deleted successfully');
      } else {
        return res.status(401).send('Unauthorized');
      }
    }
    await post.comments.splice(index, 1);
    await post.save();
    if (post.user.toString() !== userId) {
      await removeCommentNotification(
        postId,
        commentId,
        userId,
        post.user.toString()
      );
    }
    return res.status(200).send('Comment deleted successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

// Like a comment
router.post('/like/:postId/:commentId/', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { postId, commentId } = req.params;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send('Post not found');

    const comment = post.comments.find((comment) => comment._id === commentId);

    if (!comment) return res.status(404).send('Comment not found');

    const newLike = {
      user: userId,
      date: Date.now(),
      _id: uuid()
    };
    comment.likes.unshift(newLike);
    await post.save();
    return res.status(200).send('Comment Liked');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

// Unlike a comment
router.post('/unlike/:postId/:commentId/', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { postId, commentId } = req.params;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send('Post not found');

    const comment = post.comments.find((comment) => comment._id === commentId);

    if (!comment) return res.status(404).send('Comment not found');

    const isLiked =
      comment.likes.filter((like) => like.user.toString() === userId).length ===
      0;
    if (isLiked) {
      res.status(401).send('Comment not liked before');
    }

    const index = comment.likes.map((like) => like.user).indexOf(userId);

    // Remove like
    await post.comments
      .find((comment) => comment._id === commentId)
      .likes.splice(index, 1);
    await post.save();
    return res.status(200).send('Unliked comment successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});
module.exports = router;
