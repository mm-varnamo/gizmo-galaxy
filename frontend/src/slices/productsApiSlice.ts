import { PRODUCTS_URL, UPLOAD_URL } from '../constants';
import { Product as ProductModel } from '../models/product';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query<ProductModel[], void>({
			query: () => ({
				url: PRODUCTS_URL,
			}),
			providesTags: ['Product'],
			keepUnusedDataFor: 5,
		}),
		getProductDetails: builder.query<ProductModel, string>({
			query: (productId) => ({
				url: `${PRODUCTS_URL}/${productId}`,
			}),
			providesTags: ['Product'],
			keepUnusedDataFor: 5,
		}),
		createProduct: builder.mutation({
			query: () => ({
				url: PRODUCTS_URL,
				method: 'POST',
			}),
			invalidatesTags: ['Product'],
		}),
		updateProduct: builder.mutation({
			query: (data) => ({
				url: `${PRODUCTS_URL}/${data._id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Product'],
		}),
		uploadProductImage: builder.mutation({
			query: (data) => ({
				url: UPLOAD_URL,
				method: 'post',
				body: data,
			}),
		}),
		deleteProduct: builder.mutation({
			query: (productId) => ({
				url: `${PRODUCTS_URL}/${productId}`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductDetailsQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useUploadProductImageMutation,
	useDeleteProductMutation,
} = productsApiSlice;
