import express from 'express';
const userController = require('../controller/userController')

const router = express.Router();

router.get('/profile/:id', userController.getProfile);
router.patch('/edit/:id', userController.EditProfile);
router.patch('/changePassword/:id', userController.ChangePassword);
router.delete('/deleteUser', userController.deleteUser);

export default router;