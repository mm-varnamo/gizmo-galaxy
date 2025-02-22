export interface Product {
	_id: string;
	brand: string;
	category: string;
	countInStock: number;
	createdAt: string;
	description: string;
	image: string;
	name: string;
	numReviews: number;
	price: number;
	rating: number;
	reviews: [];
	updatedAt: string;
	user: string;
}
