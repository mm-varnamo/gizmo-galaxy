import mongoose from 'mongoose';
import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import Product from '../models/productModel';

export const getProducts: RequestHandler = async (req, res, next) => {
	try {
		const products = await Product.find({});
		res.json(products);
	} catch (error) {
		next(error);
	}
};

export const getProductById: RequestHandler = async (req, res, next) => {
	const productId = req.params.id;

	try {
		if (!mongoose.isValidObjectId(productId)) {
			throw createHttpError(400, 'Invalid product id');
		}

		const product = await Product.findById(productId).exec();

		if (!product) {
			throw createHttpError(404, 'Product not found');
		}

		res.status(200).json(product);
	} catch (error) {
		next(error);
	}
};
