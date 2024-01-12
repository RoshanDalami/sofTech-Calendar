const express = require('express')
const {postComment,getComment,getCommentByTodoId} = require('./comment.controller')
const CommentRouter = express.Router();

CommentRouter.post('/createComment',postComment)
CommentRouter.get('/getComment',getComment);
CommentRouter.get('/getCommentByTodoId/:id',getCommentByTodoId)



module.exports = CommentRouter