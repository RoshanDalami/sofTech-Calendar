const mongoose = require('mongoose')
const todoSchema = new mongoose.Schema({
    todoTitle:{
        type:String,
        require:[true,'Todo title is required']
    },
    assignedTo:{
        type:String,
        require:[true,'Assigne is required']
    },
    columnId:{
        type:String,
        require:[true,'ColumnId is required'],
        default:'1'
    },
    taskId:{
        type:String,
        require:[true]
    }
    
},{timestamps:true});

const Todo = mongoose.model('Todo',todoSchema);
module.exports = Todo