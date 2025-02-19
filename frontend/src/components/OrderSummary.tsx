import { CartState } from '../models/cart';

interface OrderSummaryProps {
	order: CartState;
}

const OrderSummary = ({ order }: OrderSummaryProps) => {
	return (
		<div>
			<div>
				<h2>Order Summary</h2>
			</div>
			<div>
				<div>
					<p>Items</p>
					<p>{order.itemsPrice}&euro;</p>
				</div>
				<div>
					<p>Shipping</p>
					<p>{order.shippingPrice}&euro;</p>
				</div>
				<div>
					<p>Tax</p>
					<p>{order.taxPrice}&euro;</p>
				</div>
				<div>
					<p>Total</p>
					<p>{order.totalPrice}&euro;</p>
				</div>
			</div>
		</div>
	);
};

export default OrderSummary;
