const Image = require('../../Model/image.mongo');
const uploadToCloudinary = require('../../utils/cloudinary')
const uploadImage = async(req,res)=>{
    const commentId = req.body;
    const imagePath = req.files?.image[0].path;
    if(!imagePath) return ;
    const image = await uploadToCloudinary(imagePath);
    const createdImage = new Image({
        image:image,
        commentId:commentId.commentId
    })
    const savedImage = await createdImage.save()
    res.status(200).json(savedImage)
}

module.exports = {uploadImage}