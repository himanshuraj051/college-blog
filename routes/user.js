const express = require('express');
const {
    createUserForm,
    createUser,
    loginForm,
    authenticateUser
} = require('../controllers/userController');
const userRouter = express.Router();

userRouter.get('/signup', createUserForm);
userRouter.get('/login', loginForm);

userRouter.post('/signup', createUser);
userRouter.post('/login', authenticateUser)

module.exports = userRouter;