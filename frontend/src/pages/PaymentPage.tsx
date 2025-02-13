import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';
import { RootState } from '../store';

const PaymentPage = () => {
	const [paymentMethod, setPaymentMethod] = useState('PayPal');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const cart = useSelector((state: RootState) => state.cart);
	const { shippingAddress } = cart;

	useEffect(() => {
		if (!shippingAddress) {
			navigate('/shipping');
		}
	}, [shippingAddress, navigate]);

	const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		navigate('/placeorder');
	};

	return (
		<FormContainer>
			<CheckoutSteps step={3} />
			<h1>Payment Method</h1>
			<h2>Select Method</h2>
			<form onSubmit={onSubmitHandler}>
				<div>
					<input
						type='radio'
						id='PayPal'
						value={'PayPal'}
						onChange={(e) => setPaymentMethod(e.target.value)}
						checked
					/>
					<label htmlFor='PayPal'>PayPal or Credit Card</label>
				</div>
				<button type='submit'>Continue</button>
			</form>
		</FormContainer>
	);
};

export default PaymentPage;
