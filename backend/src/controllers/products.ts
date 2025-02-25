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

export const createProduct: RequestHandler = async (req, res, next) => {
	try {
		const product = new Product({
			name: 'Sample name',
			price: 0,
			user: req.user?.id,
			image: '/images/sample.jpg',
			brand: 'Sample brand',
			category: 'Sample category',
			countInstock: 0,
			numReviews: 0,
			description: 'Sample description',
		});

		const createdProduct = await product.save();

		res.status(201).json(createdProduct);
	} catch (error) {
		next(error);
	}
};

export const updateProduct: RequestHandler = async (req, res, next) => {
	try {
		const updates = req.body;

		const product = await Product.findById(req.params.id);

		if (!product) {
			throw createHttpError(404, 'Product not found');
		}

		Object.assign(product, updates);

		const updatedProduct = await product.save();

		res.json(updatedProduct);
	} catch (error) {
		next(error);
	}
};

export const deleteProduct: RequestHandler = async (req, res, next) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			throw createHttpError(404, 'Product not found');
		}

		await Product.deleteOne({ _id: product._id });

		res.status(200).json({ message: 'Product was successfully deleted' });
	} catch (error) {
		next(error);
	}
};
