const express = require('express');
const ImageRouter = express.Router();
const {uploadImage} = require('./image.controller');
const { upload } = require("../../Middlewares/multer.middleware")


ImageRouter.route('/imageupload').post(upload.fields([
    {
        name:'image',
        maxCount:1,
    }
]),uploadImage)

module.exports = ImageRouter