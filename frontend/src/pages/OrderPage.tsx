import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import isFetchBaseQueryError from '../utils/fetchErrorHandler';
import {
	useGetOrderDetailsQuery,
	usePayOrderMutation,
	useGetPayPalClientIdQuery,
	useDeliverOrderMutation,
} from '../slices/ordersApiSlice';
import {
	DISPATCH_ACTION,
	PayPalButtons,
	SCRIPT_LOADING_STATE,
	usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import OrderSummary from '../components/OrderSummary';
import { ApiError } from '../types/apiTypes';

const OrderPage = () => {
	const { id: orderId } = useParams();

	const {
		data: order,
		refetch,
		isLoading,
		error,
	} = useGetOrderDetailsQuery(orderId);

	const [payOrder, { isLoading: isPaymentLoading }] = usePayOrderMutation();

	const [deliverOrder, { isLoading: isDeliverLoading }] =
		useDeliverOrderMutation();

	const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

	const {
		data: paypal,
		isLoading: isPayPalLoading,
		error: errorPayPal,
	} = useGetPayPalClientIdQuery(null);

	const { userInfo } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		if (!errorPayPal && !isPayPalLoading && paypal && paypal.clientId) {
			const loadPayPalScript = async () => {
				paypalDispatch({
					type: DISPATCH_ACTION.RESET_OPTIONS,
					value: {
						clientId: paypal.clientId,
						currency: 'USD',
					},
				});
				paypalDispatch({
					type: DISPATCH_ACTION.LOADING_STATUS,
					value: SCRIPT_LOADING_STATE.PENDING,
				});
			};

			if (order && !order.isPaid) {
				if (!window.paypal) {
					loadPayPalScript();
				}
			}
		}
	}, [order, errorPayPal, isPayPalLoading, paypal, paypalDispatch]);

	const onApprove = (data: any, actions: any) => {
		return actions.order.capture().then(async function (details: any) {
			try {
				await payOrder({ orderId, details });
				refetch();
				toast.success('Payment successful');
			} catch (error: any) {
				toast.error(error?.data?.message || error.message);
			}
		});
	};

	const onError = (error: any) => {
		toast.error(error.message);
	};

	const createOrder = async (data: any, actions: any) => {
		return actions.order
			.create({
				purchase_units: [
					{
						amount: {
							value: order.totalPrice,
						},
					},
				],
			})
			.then((orderId: any) => {
				return orderId;
			});
	};

	const deliverOrderHandler = async () => {
		try {
			await deliverOrder(order._id).unwrap();
			refetch();
			toast.success('Order set to delivered');
		} catch (error) {
			const apiError = error as ApiError;
			toast.error(apiError?.data?.error || apiError.error);
		}
	};

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
							{order.orderItems.map((item: any) => (
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
						<OrderSummary order={order} />
						{!order.isPaid && (
							<div>
								{isPaymentLoading && (
									<Loader loading={isPaymentLoading} size={10} />
								)}

								{isPending ? (
									<Loader loading={isPending} size={10} />
								) : (
									<div>
										{/* <button onClick={onApproveTest}>Test Pay Order</button> */}
										<div>
											<PayPalButtons
												createOrder={createOrder}
												onApprove={onApprove}
												onError={onError}
											></PayPalButtons>
										</div>
									</div>
								)}
							</div>
						)}

						{isDeliverLoading && (
							<Loader loading={isDeliverLoading} size={10} />
						)}

						{userInfo &&
							userInfo.isAdmin &&
							order.isPaid &&
							!order.isDelivered && (
								<div>
									<button type='button' onClick={deliverOrderHandler}>
										Set to delivered
									</button>
								</div>
							)}
					</div>
				</div>
			</div>
		</>
	);
};

export default OrderPage;
