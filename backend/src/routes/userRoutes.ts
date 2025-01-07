import express from 'express';
import * as UserController from '../controllers/user';
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware';
const router = express.Router();

router.get('/', isAuthenticated, isAdmin, UserController.getUsers);
router.post('/register', UserController.registerUser);
router.post('/logout', UserController.logoutUser);
router.post('/login', UserController.loginUser);
router.get('/profile', isAuthenticated, UserController.getUserProfile);
router.put('/profile', isAuthenticated, UserController.updateUserProfile);
router.delete('/:id', isAuthenticated, isAdmin, UserController.deleteUser);
router.get('/:id', isAuthenticated, isAdmin, UserController.getUserById);
router.put('/:id', isAuthenticated, isAdmin, UserController.updateUser);

export default router;
