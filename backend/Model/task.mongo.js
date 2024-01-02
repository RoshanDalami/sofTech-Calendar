const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    userDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    taskTitle:{
        type:String,
        require:[true,'Task title is required']
    },
    taskDescription:{
        type:String,
        require:[true,'Task description is required']
    },
},{timestamps:true})

const Task = mongoose.model('Task',taskSchema)

module.exports = Task