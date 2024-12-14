import { Link } from 'react-router-dom';

const Header = () => {
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
						<li></li>
						<li></li>
						<li></li>
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default Header;
