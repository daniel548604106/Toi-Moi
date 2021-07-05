const express = require('express');
const router = express.Router();
const Story = require('../models/storyModel');
const { uploadStoryImage } = require('../middleware/uploadMiddleware');
const Vimeo = require('vimeo').Vimeo;
const authMiddleware = require('../middleware/authMiddleware');
const { default: Stories } = require('../components/Home/Feed/Story/Stories');

const vimeo_account = new Vimeo(
  process.env.VIMEO_CLIENT_ID,
  process.env.VIMEO_CLIENT_SECRET,
  process.env.VIMEO_ACCESS_TOKEN
);
router.post(
  '/upload/image',
  authMiddleware,
  uploadStoryImage,
  async (req, res) => {
    try {
      const { userId } = req;
      const { picUrl, taggedUsers, type } = req.body;
      const user = await Story.findOne({ user: userId });
      console.log(user, userId);
      if (!user) return res.status(404).send('Not found');
      const newStory = {
        createdAt: Date.now(),
        image: picUrl,
        type
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
  }
);

router.get('/', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const user = await Story.findOne({ user: userId });
    res.status(200).json(user.stories);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
