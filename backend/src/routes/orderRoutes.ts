import express from 'express';
import * as OrdersController from '../controllers/orders';
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware';
const router = express.Router();

router.post('/', isAuthenticated, OrdersController.addOrderItems);
router.get('/', isAuthenticated, isAdmin, OrdersController.getOrders);
router.get('/mine', isAuthenticated, OrdersController.getMyOrders);
router.get('/:id', isAuthenticated, OrdersController.getOrderById);
router.put('/:id/pay', isAuthenticated, OrdersController.updateOrderToPaid);
router.put(
	'/:id/deliver',
	isAuthenticated,
	isAdmin,
	OrdersController.updateOrderToDelivered
);

export default router;
