import express from 'express';
import * as ProductsController from '../controllers/products';
import { isAdmin, isAuthenticated } from '../middleware/authMiddleware';
const router = express.Router();

router.get('/', ProductsController.getProducts);
router.post('/', isAuthenticated, isAdmin, ProductsController.createProduct);
router.get('/:id', ProductsController.getProductById);
router.put('/:id', isAuthenticated, isAdmin, ProductsController.updateProduct);
router.delete(
	'/:id',
	isAuthenticated,
	isAdmin,
	ProductsController.deleteProduct
);
router.post(
	'/:id/reviews',
	isAuthenticated,
	ProductsController.createProductReview
);

export default router;
