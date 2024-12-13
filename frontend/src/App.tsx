import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';

const App = () => {
	return (
		<>
			<Header />
			<main>
				<div className='container'>
					<HomePage />
				</div>
			</main>
			<Footer />
		</>
	);
};

export default App;
