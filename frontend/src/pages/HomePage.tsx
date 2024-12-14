import Product from '../components/Product';
import products from '../products';

const HomePage = () => {
	return (
		<>
			<h1>Latest Products</h1>
			<ul>
				{products.map((product) => (
					<li>
						<Product product={product} />
					</li>
				))}
			</ul>
		</>
	);
};

export default HomePage;
