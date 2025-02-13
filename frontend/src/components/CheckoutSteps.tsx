import { Link } from 'react-router-dom';

interface CheckoutStepsProps {
	step: number;
}

const CheckoutSteps = ({ step }: CheckoutStepsProps) => {
	return (
		<nav>
			<div>
				<Link to='/login' className={step >= 1 ? '' : 'disabled-link'}>
					Login
				</Link>
			</div>
			<div>
				{step >= 2 ? (
					<Link to='/shipping'>Shipping</Link>
				) : (
					<span className='disabled-link'>Shipping</span>
				)}
			</div>
			<div>
				{step >= 3 ? (
					<Link to='/payment'>Payment</Link>
				) : (
					<span className='disabled-link'>Payment</span>
				)}
			</div>
			<div>
				{step === 4 ? (
					<Link to='/placeorder'>Place Order</Link>
				) : (
					<span className='disabled-link'>Place Order</span>
				)}
			</div>
		</nav>
	);
};

export default CheckoutSteps;
