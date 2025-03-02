import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import {
	useGetProductDetailsQuery,
	useCreateReviewMutation,
} from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import isFetchBaseQueryError from '../utils/fetchErrorHandler';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from '../store';
import { ApiError } from '../types/apiTypes';

const ProductPage = () => {
	const { id: productId } = useParams();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [qty, setQty] = useState(1);

	const [formData, setFormData] = useState({
		rating: 0,
		comment: '',
	});

	const { userInfo } = useSelector((state: RootState) => state.auth);

	const {
		data: product,
		isLoading,
		error,
	} = useGetProductDetailsQuery(productId ?? '');

	const [createReview, { isLoading: createReviewIsLoading }] =
		useCreateReviewMutation();

	const addToCartHandler = () => {
		dispatch(addToCart({ ...product, qty }));
		navigate('/cart');
	};

	const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await createReview({
				productId,
				...formData,
			}).unwrap();
			toast.success('Review Submitted!');

			setFormData({
				rating: 0,
				comment: '',
			});
		} catch (error) {
			const apiError = error as ApiError;
			toast.error(apiError?.data?.error || apiError.error);
		}
	};

	const onChangeHandler = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
	) => {
		e.preventDefault();

		setFormData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
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
					<div>
						<h2>Reviews</h2>
						{product.reviews.length === 0 && (
							<Message type='information'>This product has no reviews</Message>
						)}
						<ul>
							{product.reviews.map((review: any) => (
								<li key={review._id}>
									<strong>{review.name}</strong>
									<Rating value={review.rating} />
									<p>{review.createdAt.slice(0, 10)}</p>
									<p>{review.comment}</p>
								</li>
							))}
						</ul>
					</div>
					<div>
						<h2>Write a Customer Review</h2>
						{createReviewIsLoading && (
							<Loader loading={createReviewIsLoading} size={10} />
						)}
						{userInfo ? (
							<form onSubmit={onSubmitHandler}>
								<label htmlFor='rating'>Rating</label>
								<select
									name='rating'
									id='rating'
									value={formData.rating}
									onChange={onChangeHandler}
								>
									<option value=''>Select...</option>
									<option value='1'>1 - Poor</option>
									<option value='2'>2 - Fair</option>
									<option value='3'>3 - Good</option>
									<option value='4'>4 - Very Good</option>
									<option value='5'>5 - Great</option>
								</select>
								<label htmlFor='comment'>Comment</label>
								<textarea
									name='comment'
									id='comment'
									value={formData.comment}
									onChange={onChangeHandler}
								/>
								<button type='submit' disabled={createReviewIsLoading}>
									Submit
								</button>
							</form>
						) : (
							<Message type='information'>
								You have to <Link to='/login'>login</Link> to write a review.
							</Message>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default ProductPage;
