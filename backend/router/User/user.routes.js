const express = require('express')

const {httpRegisterUser, httpLoginUser } = require('./user.controller');

const UserRouter = express.Router();


UserRouter.post('/register',httpRegisterUser)
UserRouter.post('/login',httpLoginUser)



module.exports = UserRouter