const { createTask } = require('./tasks.controller');
const express = require('express')

const TaskRouter = express.Router();

TaskRouter.post('/createTask',createTask);



module.exports = TaskRouter
