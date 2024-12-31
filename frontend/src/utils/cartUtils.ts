import { Cart as CartModel, CartState } from '../models/cart';

export const addDecimals = (num: number) => {
	return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state: CartState) => {
	// Calculate items price
	state.itemsPrice = addDecimals(
		state.cartItems.reduce(
			(acc: number, item: CartModel) => acc + item.price * item.qty,
			0
		)
	);

	// Calculate shipping price (if order is over 200€ then free, else 10€ shipping)
	state.shippingPrice = addDecimals(Number(state.itemsPrice) > 200 ? 0 : 10);

	// Calculate tax price (25% tax)
	state.taxPrice = addDecimals(
		Number((0.25 * Number(state.itemsPrice)).toFixed(2))
	);

	// Calculate total price
	state.totalPrice = (
		Number(state.itemsPrice) +
		Number(state.shippingPrice) +
		Number(state.taxPrice)
	).toFixed(2);

	localStorage.setItem('cart', JSON.stringify(state));

	return state;
};
