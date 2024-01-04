const express = require('express');
const {createTodo,getTodos,updateStatus} = require('./todos.controller')
const TodoRouter = express.Router();

TodoRouter.post('/createTodo',createTodo)
TodoRouter.get('/getTodos',getTodos)
TodoRouter.post('/updateTodo',updateStatus)

module.exports = TodoRouter