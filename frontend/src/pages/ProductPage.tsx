import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductPage = () => {
	const { id: productId } = useParams();

	const {
		data: product,
		isLoading,
		error,
	} = useGetProductDetailsQuery(productId);

	return (
		<div>
			<Link to='/'>&lt; Home</Link>
			{isLoading && <Loader loading={isLoading} size={100} />}

			{error && isFetchBaseQueryError(error) && (
				<Message type='alert'>
					{error.data && typeof error.data === 'object' && 'error' in error.data
						? String(error.data.error)
						: 'Unknown Error'}
				</Message>
			)}
			{product && !isLoading && (
				<>
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
				</>
			)}
		</div>
	);
};

export default ProductPage;

function isFetchBaseQueryError(error: any): error is FetchBaseQueryError {
	return typeof error.status !== 'undefined';
}
