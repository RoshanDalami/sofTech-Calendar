const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    userDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comment:{
        type:String,
    },
    todoId:{
        type:String
    }
},{timestamps:true})

const Comment = mongoose.model('Comment',commentSchema)
module.exports = Comment