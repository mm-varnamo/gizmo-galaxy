import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { RootState } from '../store';
import { ApiError } from '../types/apiTypes';

const RegisterPage = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [register, { isLoading }] = useRegisterMutation();

	const { userInfo } = useSelector((state: RootState) => state.auth);

	const { search } = useLocation();
	const sp = new URLSearchParams(search);
	const redirect = sp.get('redirect') || '/';

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [userInfo, redirect, navigate]);

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			toast.error('Passwords do not match');
			return;
		} else {
			try {
				const { confirmPassword, ...registerData } = formData;
				const res = await register(registerData).unwrap();
				dispatch(setCredentials({ ...res }));
				navigate(redirect);
			} catch (error) {
				const apiError = error as ApiError;
				toast.error(apiError?.data?.error || apiError.error);
			}
		}
	};

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<FormContainer>
			<h1>Register an account</h1>
			<form onSubmit={submitHandler}>
				<div>
					<label htmlFor='name'>Name</label>
					<input
						id='name'
						type='text'
						placeholder='Name'
						value={formData.name}
						name='name'
						onChange={onChangeHandler}
					/>
				</div>
				<div>
					<label htmlFor='email'>Email</label>
					<input
						id='email'
						type='email'
						placeholder='Email'
						value={formData.email}
						name='email'
						onChange={onChangeHandler}
					/>
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<input
						id='password'
						type='password'
						placeholder='Password'
						value={formData.password}
						name='password'
						onChange={onChangeHandler}
					/>
				</div>
				<div>
					<label htmlFor='confirmPassword'>Confirm Password</label>
					<input
						id='confirmPassword'
						type='password'
						placeholder='Confirm Password'
						value={formData.confirmPassword}
						name='confirmPassword'
						onChange={onChangeHandler}
					/>
				</div>
				<button type='submit' disabled={isLoading}>
					Register
				</button>
			</form>
			<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
				Already have an account?
			</Link>
		</FormContainer>
	);
};

export default RegisterPage;
