const { createTask,updateTask,deleteTask } = require('./tasks.controller');
const express = require('express')

const TaskRouter = express.Router();

TaskRouter.post('/createTask',createTask);
TaskRouter.post('/updateTask',updateTask);
TaskRouter.delete('/deleteTask',deleteTask);



module.exports = TaskRouter
