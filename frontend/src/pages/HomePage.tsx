import products from '../products';

const HomePage = () => {
	return (
		<>
			<h1>Latest Products</h1>
			<ul>
				{products.map((product) => (
					<li>
						<h3>{product.name}</h3>
					</li>
				))}
			</ul>
		</>
	);
};

export default HomePage;
