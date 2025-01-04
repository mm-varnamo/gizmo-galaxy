import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { RootState } from '../store';
import { Cart as CartModel } from '../models/cart';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const cart = useSelector((state: RootState) => state.cart);
	const { cartItems } = cart;

	const addToCartHandler = async (item: CartModel, qty: number) => {
		dispatch(addToCart({ ...item, qty }));
	};

	const removeFromCartHandler = async (id: string) => {
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		navigate('/login?redirect=/shipping');
	};

	return (
		<div>
			<div>
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message type='information'>
						Your cart is empty <Link to='/'>&lt; Go Back</Link>
					</Message>
				) : (
					<ul>
						{cartItems.map((item: CartModel) => (
							<li key={item._id}>
								<img src={item.image} alt={item.name} />
								<Link to={`/product/${item._id}`}>{item.name}</Link>
								<p>{item.price}</p>
								<div>
									<label htmlFor='quantity'>Quantity: </label>
									<select
										id='quantity'
										value={item.qty}
										onChange={(e) => {
											addToCartHandler(item, Number(e.target.value));
										}}
									>
										{Array.from({ length: item.countInStock }, (_, index) => (
											<option key={index + 1} value={index + 1}>
												{index + 1}
											</option>
										))}
									</select>
								</div>
								<button onClick={() => removeFromCartHandler(item._id)}>
									<FaTrash />
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
			<div>
				<h2>
					Subtotal (
					{cartItems.reduce(
						(acc: number, item: CartModel) => acc + item.qty,
						0
					)}
					)
				</h2>
				<p>
					{cartItems
						.reduce(
							(acc: number, item: CartModel) => acc + item.qty * item.price,
							0
						)
						.toFixed(2)}
					€
				</p>
			</div>
			<button disabled={cartItems.length === 0} onClick={checkoutHandler}>
				Proceed To Checkout
			</button>
		</div>
	);
};

export default CartPage;
