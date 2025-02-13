import { createSlice } from '@reduxjs/toolkit';
import { Product as ProductModel } from '../models/product';
import { updateCart } from '../utils/cartUtils';

const savedCart = localStorage.getItem('cart');

const initialState = savedCart
	? JSON.parse(savedCart)
	: { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const newItem = action.payload;

			const existItem = state.cartItems.find(
				(item: ProductModel) => item._id === newItem._id
			);

			if (existItem) {
				state.cartItems = state.cartItems.map((item: ProductModel) =>
					item._id === existItem._id ? newItem : item
				);
			} else {
				state.cartItems = [...state.cartItems, newItem];
			}

			return updateCart(state);
		},
		removeFromCart: (state, action) => {
			state.cartItems = state.cartItems.filter(
				(item: ProductModel) => item._id !== action.payload
			);

			return updateCart(state);
		},
		saveShippingAddress: (state, action) => {
			state.shippingAddress = action.payload;
			return updateCart(state);
		},
		savePaymentMethod: (state, action) => {
			state.paymentMethod = action.payload;
			return updateCart(state);
		},
	},
});

export const {
	addToCart,
	removeFromCart,
	saveShippingAddress,
	savePaymentMethod,
} = cartSlice.actions;

export default cartSlice.reducer;
