import Footer from './components/Footer';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

const App = () => {
	return (
		<>
			<Header />
			<main>
				<div className='container'>
					<Outlet />
				</div>
			</main>
			<Footer />
		</>
	);
};

export default App;
