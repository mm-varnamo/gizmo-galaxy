import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { RootState } from '../store';
import { Cart } from '../models/cart';
import logo from '../assets/images/logo.png';
import DropdownButton from './DropdownButton';

const Header = () => {
	const { cartItems } = useSelector((state: RootState) => state.cart);
	const { userInfo } = useSelector((state: RootState) => state.auth);
	const [logoutApiCall] = useLogoutMutation();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(logout(userInfo));
			navigate('/login');
		} catch (error) {
			console.log(error);
		}
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
						{!userInfo && (
							<li>
								<Link to='/register'>Register</Link>
							</li>
						)}
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default Header;
