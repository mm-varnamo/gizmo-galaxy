import { createSlice } from '@reduxjs/toolkit';

const savedCart = localStorage.getItems('cart');

const initialState = savedCart ? JSON.parse(savedCart) : { cartItems: [] };

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {},
});

export default cartSlice.reducer;
