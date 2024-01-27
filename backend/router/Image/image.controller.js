const Image = require('../../Model/image.mongo');
const uploadToCloudinary = require('../../utils/cloudinary')
const uploadImage = async(req,res)=>{
    const imagePath = req.files?.image[0].path;
    if(!imagePath) return ;
    const image = await uploadToCloudinary(imagePath);
    const createdImage = new Image({
        image:image.url
    })
    const savedImage = await createdImage.save()
    res.status(200).json(savedImage)
}

module.exports = {uploadImage}