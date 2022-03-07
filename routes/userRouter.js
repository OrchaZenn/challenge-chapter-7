import express from 'express';
const userController = require('../controller/userController')

const router = express.Router();

router.get('/:id', userController.getProfile);
router.patch('/edit/:id', userController.patchEditProfile);
router.patch('/changePassword/:id', userController.patchChangePassword);
router.delete('/deleteUser', userController.deleteUser);

export default router;