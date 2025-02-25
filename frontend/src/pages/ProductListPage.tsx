import {
	useCreateProductMutation,
	useGetProductsQuery,
	useDeleteProductMutation,
} from '../slices/productsApiSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import Loader from '../components/Loader';
import isFetchBaseQueryError from '../utils/fetchErrorHandler';
import { Link } from 'react-router-dom';
import { ApiError } from '../types/apiTypes';
import { toast } from 'react-toastify';

const ProductListPage = () => {
	const { data: products, isLoading, error, refetch } = useGetProductsQuery();
	const [createProduct, { isLoading: createProductIsLoading }] =
		useCreateProductMutation();
	const [deleteProduct, { isLoading: deleteProductIsLoading }] =
		useDeleteProductMutation();

	console.log(products);

	const onDeleteProductHandler = async (productId: string) => {
		if (!window.confirm('Are you sure you want to delete this product?'))
			return;

		try {
			const res = await deleteProduct(productId).unwrap();
			toast.success(res.message);
			refetch();
		} catch (error) {
			const apiError = error as ApiError;
			toast.error(apiError?.data?.error || apiError.error);
		}
	};

	const onCreateProductHandler = async () => {
		if (window.confirm('Are you sure you want to add a new product?')) {
			try {
				await createProduct(null).unwrap();
				refetch();
			} catch (error) {
				const apiError = error as ApiError;
				toast.error(apiError?.data?.error || apiError.error);
			}
		} else {
			return;
		}
	};

	return (
		<>
			<div>
				<h1>Products</h1>
				<button
					disabled={createProductIsLoading}
					onClick={onCreateProductHandler}
				>
					{createProductIsLoading ? (
						'Loading...'
					) : (
						<span>
							<FaEdit /> Create Product
						</span>
					)}
				</button>
				{isLoading ? (
					<Loader loading={isLoading} size={10} />
				) : error && isFetchBaseQueryError(error) ? (
					<Message type='alert'>
						{error.data &&
						typeof error.data === 'object' &&
						'error' in error.data
							? String(error.data.error)
							: 'Unknown Error'}
					</Message>
				) : (
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>PRICE</th>
								<th>CATEGORY</th>
								<th>BRAND</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{products?.map((product) => (
								<tr key={product._id}>
									<td>{product._id}</td>
									<td>{product.name}</td>
									<td>{product.price}</td>
									<td>{product.category}</td>
									<td>{product.brand}</td>
									<td>
										<Link to={`/admin/product/${product._id}/edit`}>
											<FaEdit />
										</Link>
										<button onClick={() => onDeleteProductHandler(product._id)}>
											{deleteProductIsLoading ? '...' : <FaTrash />}
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
			<div></div>
		</>
	);
};

export default ProductListPage;
