import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

const HomePage = () => {
	const { data: products, isLoading, error } = useGetProductsQuery();

	return (
		<>
			{isLoading ? (
				<h2>Loading...</h2>
			) : error ? (
				<div>
					{isFetchBaseQueryError(error) ? (
						<p>
							{error.data &&
							typeof error.data === 'object' &&
							'message' in error.data
								? String(error.data.message)
								: 'An error occurred'}
						</p>
					) : isSerializedError(error) ? (
						<p>{String(error.message) || 'An error occurred'}</p>
					) : (
						<p>Unknown error</p>
					)}
				</div>
			) : !products || products.length === 0 ? (
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

function isSerializedError(error: any): error is SerializedError {
	return typeof error.message !== 'undefined';
}
