import mongoose, { Document } from 'mongoose';

interface Review {
	user: mongoose.Types.ObjectId;
	name: string;
	rating: number;
	comment: string;
}

interface Product {
	user: mongoose.Types.ObjectId;
	name: string;
	image: string;
	brand: string;
	category: string;
	description: string;
	reviews: Review[];
	rating: number;
	numReviews: number;
	price: number;
	countInStock: number;
	createdAt: Date;
	updatedAt: Date;
}

const reviewSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
			min: 0,
			max: 5,
		},
		comment: {
			type: String,
			required: true,
			maxlength: 500,
		},
	},
	{
		timestamps: true,
	}
);

const productSchema = new mongoose.Schema<Product>(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		reviews: [reviewSchema],
		rating: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
			max: 5,
		},
		numReviews: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		countInStock: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
		},
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model<Product>('Product', productSchema);

export default Product;
