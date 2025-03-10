import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import Order from '../models/orderModel';
import mongoose from 'mongoose';

interface Product {
	_id: mongoose.Types.ObjectId;
	name: string;
	image: string;
	brand: string;
	category: string;
	description: string;
	rating: number;
	numReviews: number;
	price: number;
	countInStock: number;
}

export const addOrderItems: RequestHandler = async (req, res, next) => {
	try {
		const {
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		} = req.body;

		if (orderItems && orderItems.length === 0) {
			throw createHttpError(400, 'No order items');
		} else {
			const order = new Order({
				orderItems: orderItems.map((item: Product) => ({
					...item,
					product: item._id,
					_id: undefined,
				})),
				user: req.user?.id,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				taxPrice,
				shippingPrice,
				totalPrice,
			});

			const createdOrder = await order.save();

			res.status(201).json(createdOrder);
		}
	} catch (error) {
		next(error);
	}
};

export const getMyOrders: RequestHandler = async (req, res, next) => {
	try {
		const orders = await Order.find({ user: req.user?.id });
		res.status(200).json(orders);
	} catch (error) {
		next(error);
	}
};

export const getOrderById: RequestHandler = async (req, res, next) => {
	try {
		const order = await Order.findById(req.params.id).populate(
			'user',
			'name email'
		);

		if (order) {
			res.status(200).json(order);
		} else {
			throw createHttpError(404, 'Order not found');
		}
	} catch (error) {
		next(error);
	}
};

export const updateOrderToPaid: RequestHandler = async (req, res, next) => {
	try {
		const order = await Order.findById(req.params.id);

		if (!order) {
			throw createHttpError(404, 'Order not found');
		}

		if (order) {
			order.isPaid = true;
			order.paidAt = new Date();
			order.paymentResult = {
				id: req.body.id,
				status: req.body.status,
				update_time: req.body.update_time,
				email_address: req.body.payer.email_address,
			};

			const updatedOrder = await order.save();

			res.status(200).json(updatedOrder);
		}
	} catch (error) {
		next(error);
	}
};

export const updateOrderToDelivered: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		const order = await Order.findById(req.params.id);

		if (!order) {
			throw createHttpError(404, 'Order not found');
		}

		order.isDelivered = true;
		order.deliveredAt = new Date();

		const updatedOrder = await order.save();

		res.status(200).json(updatedOrder);
	} catch (error) {
		next(error);
	}
};

export const getOrders: RequestHandler = async (req, res, next) => {
	try {
		const orders = await Order.find({}).populate('user', 'id name');

		res.status(200).json(orders);
	} catch (error) {
		next(error);
	}
};
