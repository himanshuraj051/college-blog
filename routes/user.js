const express = require('express');
const {
    createUserForm,
    createUser
} = require('../controllers/userController');
const userRouter = express.Router();

userRouter.get('/signup', createUserForm);

userRouter.post('/signup', createUser);

module.exports = userRouter;