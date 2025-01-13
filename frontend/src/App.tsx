import Footer from './components/Footer';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
			<ToastContainer />
		</>
	);
};

export default App;
