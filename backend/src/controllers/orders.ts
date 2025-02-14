import mongoose from 'mongoose';
import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import Order from '../models/orderModel';

export const addOrderItems: RequestHandler = async (req, res, next) => {
	try {
		res.send('add order items');
	} catch (error) {
		next(error);
	}
};

export const getMyOrders: RequestHandler = async (req, res, next) => {
	try {
		res.send('get my orders');
	} catch (error) {
		next(error);
	}
};

export const getOrderById: RequestHandler = async (req, res, next) => {
	try {
		res.send('get order by id');
	} catch (error) {
		next(error);
	}
};

export const updateOrderToPaid: RequestHandler = async (req, res, next) => {
	try {
		res.send('update order to paid');
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
		res.send('update order to delivered');
	} catch (error) {
		next(error);
	}
};

export const getOrders: RequestHandler = async (req, res, next) => {
	try {
		res.send('get all orders');
	} catch (error) {
		next(error);
	}
};
