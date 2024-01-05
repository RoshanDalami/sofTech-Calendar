const express = require('express')

const {httpRegisterUser, httpLoginUser,getAllUser } = require('./user.controller');

const UserRouter = express.Router();


UserRouter.post('/register',httpRegisterUser)
UserRouter.post('/login',httpLoginUser)
UserRouter.get('/getAllUser',getAllUser)



module.exports = UserRouter