import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { RootState } from '../store';
import { ApiError } from '../types/apiTypes';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import isFetchBaseQueryError from '../utils/fetchErrorHandler';
import { OrderItem } from '../models/order';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const dispatch = useDispatch();

	const { userInfo } = useSelector((state: RootState) => state.auth);

	const [updateProfile, { isLoading: profileUpdateIsLoading }] =
		useProfileMutation();

	const { data: orders, isLoading, error } = useGetMyOrdersQuery(null);

	useEffect(() => {
		if (userInfo) {
			setFormData((prevData) => ({
				...prevData,
				name: userInfo.name,
				email: userInfo.email,
			}));
		}
	}, [userInfo]);

	const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			toast.error('The passwords do not match');
			return;
		}

		try {
			const { confirmPassword, ...profileData } = formData;
			const response = await updateProfile({
				_id: userInfo._id,
				...profileData,
			}).unwrap();

			dispatch(setCredentials(response));

			toast.success('Profile updated successfully');
		} catch (error) {
			const apiError = error as ApiError;
			toast.error(apiError?.data?.error || apiError.error);
		}
	};

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div>
			<div>
				<h2>User Profile</h2>
				<form onSubmit={onSubmitHandler}>
					<label htmlFor='name'>Name</label>
					<input
						value={formData.name}
						placeholder='Enter name'
						type='text'
						id='name'
						name='name'
						onChange={onChangeHandler}
					/>
					<label htmlFor='email'>Email</label>
					<input
						value={formData.email}
						placeholder='Enter email'
						type='email'
						id='email'
						name='email'
						onChange={onChangeHandler}
					/>
					<label htmlFor='password'>Password</label>
					<input
						value={formData.password}
						placeholder='Enter password'
						type='password'
						id='password'
						name='password'
						onChange={onChangeHandler}
					/>
					<label htmlFor='confirmPassword'>Confirm password</label>
					<input
						value={formData.confirmPassword}
						placeholder='Confirm password'
						type='password'
						id='confirmPassword'
						name='confirmPassword'
						onChange={onChangeHandler}
					/>
					<button type='submit'>Update</button>
					{profileUpdateIsLoading && (
						<Loader loading={profileUpdateIsLoading} size={10} />
					)}
				</form>
			</div>
			<div>
				<h2>My Orders</h2>
				{error && isFetchBaseQueryError(error) && (
					<Message type='alert'>
						{error.data &&
						typeof error.data === 'object' &&
						'error' in error.data
							? String(error.data.error)
							: 'Unknown Error'}
					</Message>
				)}
				{isLoading && !error ? (
					<Loader loading={isLoading} size={10} />
				) : (
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th></th>
							</tr>
						</thead>

						<tbody>
							{!orders ? (
								<p>No Orders</p>
							) : (
								orders.map((order: OrderItem) => (
									<tr key={order._id}>
										<td>{order._id}</td>
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
											<Link to={`/order/${order._id}`}>
												<button>Details</button>
											</Link>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

export default ProfilePage;
