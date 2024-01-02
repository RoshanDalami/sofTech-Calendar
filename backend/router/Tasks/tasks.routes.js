const { createTask,updateTask,deleteTask,getAllTask,getTaskById } = require('./tasks.controller');
const express = require('express')

const TaskRouter = express.Router();

TaskRouter.post('/createTask',createTask);
TaskRouter.post('/updateTask',updateTask);
TaskRouter.delete('/deleteTask',deleteTask);
TaskRouter.get('/getAllTasks',getAllTask);
TaskRouter.get('/getTaskById/:id',getTaskById);



module.exports = TaskRouter
