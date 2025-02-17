import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import CheckoutSteps from '../components/CheckoutSteps';
import { RootState } from '../store';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import isFetchBaseQueryError from '../utils/fetchErrorHandler';
import { ApiError } from '../types/apiTypes';

const PlaceOrderPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cart = useSelector((state: RootState) => state.cart);

	const [createOrder, { isLoading, error }] = useCreateOrderMutation();

	useEffect(() => {
		if (!cart.shippingAddress.address) {
			navigate('/shipping');
		} else if (!cart.paymentMethod) {
			navigate('/payment');
		}
	}, [cart, navigate]);

	const placeOrderHandler = async () => {
		try {
			const res = await createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			}).unwrap();

			dispatch(clearCartItems());
			navigate(`/order/${res._id}`);
		} catch (error) {
			const apiError = error as ApiError;
			toast.error(apiError?.data?.error || apiError.error);
		}
	};

	return (
		<>
			<CheckoutSteps step={4} />
			<div style={{ display: 'flex' }}>
				<div>
					<div>
						<h2>Shipping</h2>
						<p>
							<strong>Adress: </strong>
							{cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
							{cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
						</p>
					</div>
					<div>
						<h2>Payment Method</h2>
						<strong>Method: </strong>
						{cart.paymentMethod}
					</div>
					<div>
						<h2>Order Items: </h2>
						{cart.cartItems.length === 0 ? (
							<Message type='information'>You cart is empty</Message>
						) : (
							<ul>
								{cart.cartItems.map((item: any) => (
									<li key={item.name}>
										<img src={item.image} alt={item.name} />
										<Link
											style={{ display: 'block' }}
											to={`/products/${item.product}`}
										>
											{item.name}
										</Link>
										<p>
											{item.qty} x {item.price}&euro; = {item.qty * item.price}
											&euro;
										</p>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
				<div>
					<h2>Order Summary</h2>
					<div>
						<p>Items: {cart.itemsPrice}&euro;</p>
					</div>
					<div>
						<p>Shipping: {cart.shippingPrice}&euro;</p>
					</div>
					<div>
						<p>Tax: {cart.taxPrice}&euro;</p>
					</div>
					<div>
						<p>Total: {cart.totalPrice}&euro;</p>
					</div>
					<div>
						{error && isFetchBaseQueryError(error) && (
							<Message type='alert'>
								{error.data &&
								typeof error.data === 'object' &&
								'error' in error.data
									? String(error.data.error)
									: 'Unknown Error'}
							</Message>
						)}
					</div>
					<div>
						<button
							type='button'
							disabled={cart.cartItems.length === 0}
							onClick={placeOrderHandler}
						>
							Place Order
						</button>
						{isLoading && <Loader loading={isLoading} size={100} />}
					</div>
				</div>
			</div>
		</>
	);
};

export default PlaceOrderPage;
