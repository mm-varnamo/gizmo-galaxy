import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('submit');
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
				<button type='submit'>Login</button>
				<Link to='/register'>Don't have an account?</Link>
			</form>
		</FormContainer>
	);
};

export default LoginPage;
