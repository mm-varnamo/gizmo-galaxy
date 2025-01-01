import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Cart } from '../models/cart';

const Header = () => {
	const { cartItems } = useSelector((state: RootState) => state.cart);
	console.log(cartItems);

	return (
		<header>
			<nav>
				<div className='container'>
					<div className='logo'>
						<Link to={'/'}>
							<img src='' alt='Website Logo' />
						</Link>
					</div>
					<ul>
						<li>
							<Link to='/cart'>
								<FaShoppingCart /> Cart
								{cartItems.length > 0 &&
									cartItems.reduce(
										(acc: number, curr: Cart) => acc + curr.qty,
										0
									)}
							</Link>
						</li>
						<li></li>
						<li></li>
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default Header;
