import { useGetProductsQuery } from '../slices/productsApiSlice';
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import Loader from '../components/Loader';
import isFetchBaseQueryError from '../utils/fetchErrorHandler';
import { Link } from 'react-router-dom';

const ProductListPage = () => {
	const { data: products, isLoading, error } = useGetProductsQuery();

	console.log(products);

	const onDeleteProductHandler = (productId: string) => {
		console.log(productId);
	};

	return (
		<>
			<div>
				<h1>Products</h1>
				<button>
					<FaEdit /> Create Product
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
											<FaTrash />
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
