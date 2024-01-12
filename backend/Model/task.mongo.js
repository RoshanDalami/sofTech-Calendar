const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    userDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    taskId:{
        type:String,
        required: true
    },
    taskTitle:{
        type:String,
        require:[true,'Task title is required']
    },
    taskDescription:{
        type:String,
        require:[true,'Task description is required']
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    todos:[
        {   id:String,
            todoTitle:String,
            columnId:String ,
            assignedTo:String,
            // comment:{
            //     type:mongoose.Schema.Types.ObjectId,
            //     ref:'Comment'
            // }
            
        }
    ]

},{timestamps:true})

const Task = mongoose.model('Task',taskSchema)

module.exports = Task