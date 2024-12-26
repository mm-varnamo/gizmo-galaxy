import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

const ProductPage = () => {
	const { id: productId } = useParams();

	const {
		data: product,
		isLoading,
		error,
	} = useGetProductDetailsQuery(productId);

	return (
		<div>
			{!product && <p>Product not found</p>}
			{product && (
				<>
					<Link to='/'>&lt; Home</Link>
					{isLoading ? (
						<h2>Loading....</h2>
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
					) : (
						<div>
							<img src={product.image} alt={product.name} />
							<h2>{product.name}</h2>
							<Rating value={product.rating} numReviews={product.numReviews} />
							<p>
								Price: <strong>{product.price}&euro;</strong>
							</p>
							<p>Description: {product.description}</p>
							<div>
								<p>
									Status:
									<strong>
										{product.countInStock > 0 ? ' In Stock' : ' Out of stock'}
									</strong>
								</p>
							</div>
							<div>
								<button type='button' disabled={product.countInStock === 0}>
									Add To Cart
								</button>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default ProductPage;

function isFetchBaseQueryError(error: any): error is FetchBaseQueryError {
	return typeof error.status !== 'undefined';
}

function isSerializedError(error: any): error is SerializedError {
	return typeof error.message !== 'undefined';
}
