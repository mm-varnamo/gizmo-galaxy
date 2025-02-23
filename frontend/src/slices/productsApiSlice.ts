import { PRODUCTS_URL } from '../constants';
import { Product as ProductModel } from '../models/product';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query<ProductModel[], void>({
			query: () => ({
				url: PRODUCTS_URL,
			}),
			keepUnusedDataFor: 5,
		}),
		getProductDetails: builder.query({
			query: (productId) => ({
				url: `${PRODUCTS_URL}/${productId}`,
			}),
			keepUnusedDataFor: 5,
		}),
		createProduct: builder.mutation({
			query: () => ({
				url: PRODUCTS_URL,
				method: 'POST',
			}),
			invalidatesTags: ['Product'],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductDetailsQuery,
	useCreateProductMutation,
} = productsApiSlice;
