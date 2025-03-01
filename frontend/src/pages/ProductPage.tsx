import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import isFetchBaseQueryError from '../utils/fetchErrorHandler';
import { useDispatch } from 'react-redux';

const ProductPage = () => {
	const { id: productId } = useParams();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [qty, setQty] = useState(1);

	const {
		data: product,
		isLoading,
		error,
	} = useGetProductDetailsQuery(productId ?? '');

	const addToCartHandler = () => {
		dispatch(addToCart({ ...product, qty }));
		navigate('/cart');
	};

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
						{product.countInStock > 0 && (
							<div>
								<label htmlFor='quantity'>Quantity: </label>
								<select
									id='quantity'
									onChange={(e) => setQty(Number(e.target.value))}
								>
									{Array.from({ length: product.countInStock }, (_, index) => (
										<option key={index + 1} value={index + 1}>
											{index + 1}
										</option>
									))}
								</select>
							</div>
						)}
						<button
							type='button'
							disabled={product.countInStock === 0}
							onClick={addToCartHandler}
						>
							Add To Cart
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default ProductPage;
