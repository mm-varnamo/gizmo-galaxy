import express from 'express';
import * as UserController from '../controllers/user';
import User from '../models/userModel';
const router = express.Router();

router.get('/', UserController.getUsers);
router.post('/register', UserController.registerUser);
router.post('/logout', UserController.logoutUser);
router.post('/login', UserController.loginUser);
router.get('/profile', UserController.getUserProfile);
router.put('/profile', UserController.updateUserProfile);
router.delete('/:id', UserController.deleteUser);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);

export default router;
