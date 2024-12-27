import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomePage = () => {
	const { data: products, isLoading, error } = useGetProductsQuery();

	return (
		<>
			{isLoading && <Loader loading={isLoading} size={100} />}
			{error && isFetchBaseQueryError(error) && (
				<Message type='alert'>
					{error.data && typeof error.data === 'object' && 'error' in error.data
						? String(error.data.error)
						: 'Unknown Error'}
				</Message>
			)}
			{!products || products.length === 0 ? (
				<h2>No products found!</h2>
			) : (
				<>
					<h1>Latest Products</h1>
					<ul>
						{products.map((product) => (
							<li key={product._id}>
								<Product product={product} />
							</li>
						))}
					</ul>
				</>
			)}
		</>
	);
};

export default HomePage;

function isFetchBaseQueryError(error: any): error is FetchBaseQueryError {
	return typeof error.status !== 'undefined';
}
