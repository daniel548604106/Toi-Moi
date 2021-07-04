const express = require('express');
const router = express.Router();
const Story = require('../models/storyModel');
const { uploadStoryImage } = require('../middleware/uploadMiddleware');
const Vimeo = require('vimeo').Vimeo;

const vimeo_account = new Vimeo(
  process.env.VIMEO_CLIENT_ID,
  process.env.VIMEO_CLIENT_SECRET,
  process.env.VIMEO_ACCESS_TOKEN
);
router.post('/upload/image', uploadStoryImage, async (req, res) => {
  try {
    const { userId } = req;
    const { picUrl, taggedUsers } = req.body;
    const user = await Story.findOne({ user: userId });
    const newStory = {
      createdAt: Date.now(),
      image: picUrl
    };
    if (taggedUsers) {
      newStory.taggedUsers = taggedUsers;
    }
    user.stories.unshift(newStory);
    await user.save();
    res.status(200).json(newStory);
    console.log('testing complete');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
