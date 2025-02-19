import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { RootState } from '../store';
import { ApiError } from '../types/apiTypes';

const ProfilePage = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const dispatch = useDispatch();

	const { userInfo } = useSelector((state: RootState) => state.auth);

	const [updateProfile, { isLoading: profileUpdateIsLoading }] =
		useProfileMutation();

	useEffect(() => {
		if (userInfo) {
			setName(userInfo.name);
			setEmail(userInfo.email);
		}
	}, [userInfo]);

	const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error('The passwords do not match');
			return;
		}

		try {
			const response = await updateProfile({
				_id: userInfo._id,
				name,
				email,
				password,
			}).unwrap();

			dispatch(setCredentials(response));

			toast.success('Profile updated successfully');
		} catch (error) {
			const apiError = error as ApiError;
			toast.error(apiError?.data?.error || apiError.error);
		}
	};

	return (
		<div>
			<div>
				<h2>User Profile</h2>
				<form onSubmit={onSubmitHandler}>
					<label htmlFor='name'>Name</label>
					<input
						value={name}
						placeholder='Enter name'
						type='text'
						id='name'
						onChange={(e) => setName(e.target.value)}
					/>
					<label htmlFor='email'>Email</label>
					<input
						value={email}
						placeholder='Enter email'
						type='email'
						id='email'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label htmlFor='password'>Password</label>
					<input
						value={password}
						placeholder='Enter password'
						type='password'
						id='password'
						onChange={(e) => setPassword(e.target.value)}
					/>
					<label htmlFor='confirmPassword'>Confirm password</label>
					<input
						value={confirmPassword}
						placeholder='Confirm password'
						type='password'
						id='confirmPassword'
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<button type='submit'>Update</button>
					{profileUpdateIsLoading && (
						<Loader loading={profileUpdateIsLoading} size={10} />
					)}
				</form>
			</div>
			<div>col2</div>
		</div>
	);
};

export default ProfilePage;
