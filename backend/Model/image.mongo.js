const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
    image:{
        type:String,
        
    },
    commentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }
});

const Image = mongoose.model('Image',imageSchema);

module.exports = Image