const ImageKit = require('imagekit');

const imageKit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT
});

const uploadProfileImage = async (req, res, next) => {
  try {
    if (!req.body.profileImage) return next();
    const uploaded = await imageKit.upload({
      file: req.body.profileImage, //required
      fileName: `user-${req.params._id}-${Date.now()}`, //required
      folder: `/images/users/`
    });
    req.body.profileImage = uploaded.url;
    console.log('name', uploaded.name, 'filedId', uploaded.fileId);
    next();
  } catch (error) {
    console.log(error);
  }
};

const uploadProfileCoverImage = async (req, res, next) => {
  try {
    if (!req.body.profileCoverImage) return next();
    const uploaded = await imageKit.upload({
      file: req.body.profileCoverImage, //required
      fileName: `user-${req.params.username}-cover-${Date.now()}`, //required
      folder: `/images/users/`
    });
    req.body.profileCoverImage = uploaded.url;
    console.log(
      'name',
      uploaded.name,
      'filedId',
      uploaded.fileId,
      uploaded.url,
      req.body.profileCoverImage,
      'nonono1'
    );

    next();
  } catch (error) {
    console.log(error);
  }
};

const uploadPostImage = async (req, res, next) => {
  try {
    if (!req.body.image) return next();
    const uploaded = await imageKit.upload({
      file: req.body.image,
      fileName: `post-${req.params.id}-${Date.now()}`,
      folder: `images/posts`
    });
    req.body.picUrl = uploaded.url;
    console.log('uploaded');
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  uploadProfileImage,
  uploadPostImage,
  uploadProfileCoverImage
};
