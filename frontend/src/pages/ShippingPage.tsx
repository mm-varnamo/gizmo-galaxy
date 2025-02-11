import { useState } from 'react';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import { RootState } from '../store';

const ShippingPage = () => {
	const cart = useSelector((state: RootState) => state.cart);
	const { shippingAddress } = cart;

	const [address, setAddress] = useState(shippingAddress?.address || '');
	const [city, setCity] = useState(shippingAddress?.city || '');
	const [postalCode, setPostalCode] = useState(
		shippingAddress?.postalCode || ''
	);
	const [country, setCountry] = useState(shippingAddress?.country || '');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		navigate('/payment');
	};

	return (
		<FormContainer>
			<h1>Shipping</h1>
			<form onSubmit={submitHandler}>
				<label htmlFor='address'>Address:</label>
				<input
					id='address'
					type='text'
					placeholder='Enter address'
					value={address}
					onChange={(e) => setAddress(e.target.value)}
				/>
				<label htmlFor='city'>City:</label>
				<input
					id='city'
					type='text'
					placeholder='Enter city'
					value={city}
					onChange={(e) => setCity(e.target.value)}
				/>
				<label htmlFor='postalCode'>Postal Code:</label>
				<input
					id='postalCode'
					type='text'
					placeholder='Enter postal code'
					value={postalCode}
					onChange={(e) => setPostalCode(e.target.value)}
				/>
				<label htmlFor='country'>Country:</label>
				<input
					id='country'
					type='text'
					placeholder='Enter country'
					value={country}
					onChange={(e) => setCountry(e.target.value)}
				/>
				<button type='submit'>Continue</button>
			</form>
		</FormContainer>
	);
};

export default ShippingPage;
