const express = require('express');
const router = express.Router();
// const multer = require('multer');
// const path = require('path');

const Vimeo = require('vimeo').Vimeo;

const vimeo_account = new Vimeo(
  process.env.VIMEO_CLIENT_ID,
  process.env.VIMEO_CLIENT_SECRET,
  process.env.VIMEO_ACCESS_TOKEN
);

// const storage = multer.diskStorage({
//   destination: './uploads/videos',
//   filename: (req, file, cb) => {
//     cb(null, `video-${Date.now()} ${path.extname(file.originalname)}`);
//   }
// });

// const upload = multer({ storage: storage }).single('video');

router.post('/upload', async (req, res) => {
  try {
    return console.log(res);
    let file_name = req.body.filename;
    vimeo_account.upload(
      file_name,
      {
        name: 'Untitled',
        description: 'The description goes here.'
      },
      function (uri) {
        console.log('Your video URI is: ' + uri);
      },
      function (bytes_uploaded, bytes_total) {
        var percentage = ((bytes_uploaded / bytes_total) * 100).toFixed(2);
        console.log(bytes_uploaded, bytes_total, percentage + '%');
      },
      function (error) {
        console.log('Failed because: ' + error);
      }
    );
    console.log('testing complete');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
