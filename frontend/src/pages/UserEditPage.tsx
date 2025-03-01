import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import isFetchBaseQueryError from '../utils/fetchErrorHandler';
import { ApiError } from '../types/apiTypes';
import {
	useGetUserDetailsQuery,
	useUpdateUserMutation,
} from '../slices/usersApiSlice';

const UserEditPage = () => {
	const { id: userId } = useParams();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: '',
		name: '',
		isAdmin: false,
	});

	const { data: user, isLoading, error } = useGetUserDetailsQuery(userId ?? '');

	const [updateUser, { isLoading: updateUserIsLoading }] =
		useUpdateUserMutation();

	useEffect(() => {
		if (user) {
			setFormData(user);
		}
	}, [user]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, type, checked, value } = e.target;

		setFormData((prevData) => ({
			...prevData,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await updateUser(formData).unwrap();
			toast.success('User was successfully updated');
			navigate('/admin/userlist');
		} catch (error) {
			const apiError = error as ApiError;
			toast.error(apiError?.data?.error || apiError.error);
		}
	};

	return (
		<>
			<Link to='/admin/userlist'>Go Back</Link>
			<FormContainer>
				<h1>Edit User</h1>
				{updateUserIsLoading && (
					<Loader loading={updateUserIsLoading} size={10} />
				)}
				{isLoading ? (
					<Loader loading={isLoading} size={10} />
				) : error && isFetchBaseQueryError(error) ? (
					<Message type='alert'>
						{error.data &&
						typeof error.data === 'object' &&
						'error' in error.data
							? String(error.data.error)
							: 'Unknown Error'}
					</Message>
				) : (
					<form onSubmit={onSubmitHandler}>
						<div>
							<label htmlFor='name'>Name: </label>
							<input
								name='name'
								id='name'
								type='text'
								placeholder='Enter product name'
								value={formData.name}
								onChange={handleChange}
							/>
						</div>

						<div>
							<label htmlFor='email'>Email: </label>
							<input
								name='email'
								id='email'
								type='email'
								placeholder='Enter email'
								value={formData.email}
								onChange={handleChange}
							/>
						</div>

						<div>
							<label htmlFor='isAdmin'>Admin: </label>
							<input
								name='isAdmin'
								type='checkbox'
								checked={formData.isAdmin || false}
								onChange={handleChange}
							/>
						</div>

						<button type='submit'>Update</button>
					</form>
				)}
			</FormContainer>
		</>
	);
};

export default UserEditPage;
