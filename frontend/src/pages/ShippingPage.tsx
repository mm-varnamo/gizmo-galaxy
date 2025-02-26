import { useState } from 'react';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import { RootState } from '../store';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingPage = () => {
	const cart = useSelector((state: RootState) => state.cart);
	const { shippingAddress } = cart;

	const [formData, setFormData] = useState({
		address: shippingAddress?.address || '',
		city: shippingAddress?.city || '',
		postalCode: shippingAddress?.postalCode || '',
		country: shippingAddress?.country || '',
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(saveShippingAddress(formData));
		navigate('/payment');
	};

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<FormContainer>
			<CheckoutSteps step={2} />
			<h1>Shipping</h1>
			<form onSubmit={submitHandler}>
				<label htmlFor='address'>Address:</label>
				<input
					id='address'
					type='text'
					placeholder='Enter address'
					value={formData.address}
					name='address'
					onChange={onChangeHandler}
				/>
				<label htmlFor='city'>City:</label>
				<input
					id='city'
					type='text'
					placeholder='Enter city'
					value={formData.city}
					name='city'
					onChange={onChangeHandler}
				/>
				<label htmlFor='postalCode'>Postal Code:</label>
				<input
					id='postalCode'
					type='text'
					placeholder='Enter postal code'
					value={formData.postalCode}
					name='postalCode'
					onChange={onChangeHandler}
				/>
				<label htmlFor='country'>Country:</label>
				<input
					id='country'
					type='text'
					placeholder='Enter country'
					value={formData.country}
					name='country'
					onChange={onChangeHandler}
				/>
				<button type='submit'>Continue</button>
			</form>
		</FormContainer>
	);
};

export default ShippingPage;
