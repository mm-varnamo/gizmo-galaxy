import { useGetOrdersQuery } from '../slices/ordersApiSlice';
import { FaTimes } from 'react-icons/fa';
import Message from '../components/Message';
import Loader from '../components/Loader';
import isFetchBaseQueryError from '../utils/fetchErrorHandler';
import { Link } from 'react-router-dom';

const OrderListPage = () => {
	const { data: orders, isLoading, error } = useGetOrdersQuery(null);

	if (isLoading) return <Loader loading={isLoading} size={10} />;

	return (
		<>
			<h1>Orders</h1>
			{error && isFetchBaseQueryError(error) ? (
				<Message type='alert'>
					{error.data && typeof error.data === 'object' && 'error' in error.data
						? String(error.data.error)
						: 'Unknown Error'}
				</Message>
			) : (
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>USERS</th>
							<th>DATE</th>
							<th>TOTAL</th>
							<th>PAID</th>
							<th>DELIVERED</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders?.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.user && order.user.name}</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								<td>{order.totalPrice}&euro;</td>
								<td>
									{order.isPaid ? (
										order.paidAt.substring(0, 10)
									) : (
										<FaTimes style={{ color: 'red' }} />
									)}
								</td>
								<td>
									{order.isDelivered ? (
										order.deliveredAt.substring(0, 10)
									) : (
										<FaTimes style={{ color: 'red' }} />
									)}
								</td>
								<td>
									<Link to={`/order/${order._id}`}>Details</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</>
	);
};

export default OrderListPage;
