import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Cart } from '../models/cart';
import logo from '../assets/images/logo.png';
import DropdownButton from './DropdownButton';

const Header = () => {
	const { cartItems } = useSelector((state: RootState) => state.cart);
	const { userInfo } = useSelector((state: RootState) => state.auth);

	const logoutHandler = () => {
		console.log('logout');
	};

	return (
		<header>
			<nav>
				<div className='container'>
					<div className='logo'>
						<Link to={'/'}>
							<img
								src={logo}
								style={{ width: '20vw', height: '10vh' }}
								alt='Website Logo'
							/>
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
						{userInfo ? (
							<DropdownButton user={userInfo.name} onLogout={logoutHandler} />
						) : (
							<li>
								<Link to='/login'>Login</Link>
							</li>
						)}
						<li></li>
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default Header;
