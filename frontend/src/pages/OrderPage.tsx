import { Link, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';
import isFetchBaseQueryError from '../utils/fetchErrorHandler';
import { OrderItem } from '../models/order';

const OrderPage = () => {
	const { id: orderId } = useParams();

	const {
		data: order,
		refetch,
		isLoading,
		error,
	} = useGetOrderDetailsQuery(orderId);

	console.log(order);

	if (isLoading) return <Loader loading={isLoading} size={10} />;

	if (error && isFetchBaseQueryError(error))
		return (
			<Message type='alert'>
				{error.data && typeof error.data === 'object' && 'error' in error.data
					? String(error.data.error)
					: 'Unknown Error'}
			</Message>
		);

	return (
		<>
			<h1>Order {order._id}</h1>
			<div style={{ display: 'flex' }}>
				<div>
					<div>
						<h2>Shipping</h2>
						<p>
							<strong>Name: </strong> {order.user.name}
						</p>
						<p>
							<strong>Email: </strong> {order.user.email}
						</p>
						<p>
							<strong>Address: </strong> {order.shippingAddress.address},{' '}
							{order.shippingAddress.city} {order.shippingAddress.postalCode},{' '}
							{order.shippingAddress.country}
						</p>
						{order.isDelivered ? (
							<Message type='information'>
								Delivered on {order.deliveredAt}
							</Message>
						) : (
							<Message type='alert'>Not Delivered</Message>
						)}
					</div>
					<div>
						<h2>Payment Method</h2>
						<p>
							<strong>Method: </strong>
							{order.paymentMethod}
						</p>
						{order.isPaid ? (
							<Message type='information'>Paid on {order.paidAt}</Message>
						) : (
							<Message type='alert'>Not Paid</Message>
						)}
					</div>
					<div>
						<h2>Order Items</h2>
						<ul>
							{order.orderItems.map((item: OrderItem) => (
								<li key={item._id}>
									<img src={item.image} alt={item.name} />
									<Link to={`/product/${item.product}`}>{item.name}</Link>
									<p>
										{item.qty} x {item.price}&euro; = {item.qty * item.price}
										&euro;
									</p>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div>
					<div>
						<h2>Order Summary</h2>
					</div>
					<div>
						<div>
							<p>Items</p>
							<p>{order.itemsPrice}</p>
						</div>
						<div>
							<p>Shipping</p>
							<p>{order.shippingPrice}</p>
						</div>
						<div>
							<p>Tax</p>
							<p>{order.taxPrice}</p>
						</div>
						<div>
							<p>Total</p>
							<p>{order.totalPrice}</p>
						</div>
						{/* PAY ORDER PLACEHOLDER */}
						{/* MARK AS DELIVERED PLACEHOLDER */}
					</div>
				</div>
			</div>
		</>
	);
};

export default OrderPage;
