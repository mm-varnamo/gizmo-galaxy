import { Product } from './product';

export interface Cart extends Product {
	qty: number;
}

export interface CartState {
	cartItems: Cart[];
	itemsPrice: string;
	shippingPrice: string;
	taxPrice: string;
	totalPrice: string;
}
