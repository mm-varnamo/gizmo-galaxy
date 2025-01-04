import { createSlice } from '@reduxjs/toolkit';
import { Product as ProductModel } from '../models/product';
import { updateCart } from '../utils/cartUtils';

const savedCart = localStorage.getItem('cart');

const initialState = savedCart ? JSON.parse(savedCart) : { cartItems: [] };

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
	},
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
