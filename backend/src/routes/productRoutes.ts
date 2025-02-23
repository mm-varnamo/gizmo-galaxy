import express from 'express';
import * as ProductsController from '../controllers/products';
import { isAdmin, isAuthenticated } from '../middleware/authMiddleware';
const router = express.Router();

router.get('/', ProductsController.getProducts);

router.post('/', isAuthenticated, isAdmin, ProductsController.createProduct);

router.get('/:id', ProductsController.getProductById);

export default router;
