import mongoose from 'mongoose';
import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import Product from '../models/productModel';

export const getProducts: RequestHandler = async (req, res, next) => {
	try {
		const pageSize = 4;
		const page = Number(req.query.pageNumber) || 1;

		const keyword = req.query.keyword
			? { name: { $regex: req.query.keyword, $options: 'i' } }
			: {};

		const count = await Product.countDocuments({ ...keyword });

		const products = await Product.find({ ...keyword })
			.limit(pageSize)
			.skip(pageSize * (page - 1));

		res.json({
			products,
			page,
			pages: Math.ceil(count / pageSize),
		});
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

export const createProductReview: RequestHandler = async (req, res, next) => {
	const { rating, comment } = req.body;

	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			throw createHttpError(404, 'Product not found');
		}

		const alreadyReviewed = product.reviews.find(
			(review) => review.user.toString() === req.user?.id.toString()
		);

		if (alreadyReviewed) {
			throw createHttpError(400, 'Product already reviewed');
		}

		const review = {
			name: req.user?.name,
			rating: Number(rating),
			comment,
			user: req.user?.id,
		};

		product.reviews.push(review);

		product.numReviews = product.reviews.length;

		product.rating =
			product.reviews.reduce((acc, review) => acc + review.rating, 0) /
			product.reviews.length;

		await product.save();

		res.status(201).json({ message: 'Review added' });
	} catch (error) {
		next(error);
	}
};

export const getTopProducts: RequestHandler = async (req, res, next) => {
	try {
		const products = await Product.find({}).sort({ rating: -1 }).limit(3);

		if (!products) {
			throw createHttpError(404, 'No products found');
		}

		res.status(200).json(products);
	} catch (error) {
		next(error);
	}
};
