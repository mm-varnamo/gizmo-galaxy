import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { RootState } from '../store';
import { ApiError } from '../types/apiTypes';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [login, { isLoading }] = useLoginMutation();

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
		try {
			const res = await login({ email, password }).unwrap();
			dispatch(setCredentials({ ...res }));
			navigate(redirect);
		} catch (error) {
			const apiError = error as ApiError;
			toast.error(apiError?.data?.error || apiError.error);
		}
	};

	return (
		<FormContainer>
			<h1>Sign In</h1>
			<form onSubmit={submitHandler}>
				<div>
					<label htmlFor='email'>Email</label>
					<input
						id='email'
						type='email'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<input
						id='password'
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type='submit' disabled={isLoading}>
					Login
				</button>
				{/* {isLoading && <Loader loading={isLoading} size={100} />} */}
			</form>
			<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
				Don't have an account?
			</Link>
		</FormContainer>
	);
};

export default LoginPage;
