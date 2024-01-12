const express = require('express')

const {httpRegisterUser, httpLoginUser,getAllUser,deleteUser } = require('./user.controller');

const UserRouter = express.Router();


UserRouter.post('/register',httpRegisterUser)
UserRouter.post('/login',httpLoginUser)
UserRouter.get('/getAllUser',getAllUser)
UserRouter.delete('/deleteUser/:id',deleteUser)



module.exports = UserRouter