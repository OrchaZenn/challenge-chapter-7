const UserController = require('../controller/userController.js');

const userRouter = require('express').Router();

//User Route
userRouter.get('/users', UserController.viewAll);
userRouter.post('/users/create', UserController.addUser);
userRouter.get('/user/:id', UserController.viewById);

userRouter.get('/users/delete/:id', UserController.deleteUser);
userRouter.get('/users/update/:id', UserController.getEditForm);
userRouter.post('/users/update/:id', UserController.editUser);

module.exports = userRouter;