const ImageKit = require("imagekit");

const imageKit = new ImageKit({
  publicKey : process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey : process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint : process.env.IMAGE_KEY_URL_ENDPOINT
});


export const uploadProfileImage = async (req,res, next) => {
  try{
    if(!req.body.profileImage) return next()
     const uploaded = await imageKit.upload({
      file : req.body.profileImage, //required
      fileName : `user-${req.params._id}-${Date.now()}`,   //required
      folder: `/images/users/`
    })
     req.body.profileImage = uploaded.url
      console.log('name',uploaded.name, 'filedId', uploaded.fileId)
      next()
  }catch(error){
    console.log(error)
  }
}
