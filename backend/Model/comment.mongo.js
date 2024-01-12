const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    userDetails:{
        type:Object,
        ref:'User'
    },
    content:{
        type:String,
    },
    image:{
        type:String
    },
    todoId:{
        type:String
    }
},{timestamps:true})

const Comment = mongoose.model('Comment',commentSchema)
module.exports = Comment