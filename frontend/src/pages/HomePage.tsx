import { useEffect, useState } from 'react';
import Product from '../components/Product';
import { Product as ProductModel } from '../models/product';
import axios from 'axios';

const HomePage = () => {
	const [products, setProducts] = useState<ProductModel[] | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			const { data } = await axios.get('/api/products');
			setProducts(data);
		};

		fetchProducts();
	}, []);

	return (
		<>
			<h1>Latest Products</h1>
			{products && (
				<ul>
					{products.map((product) => (
						<li>
							<Product product={product} />
						</li>
					))}
				</ul>
			)}
			{!products && <p>No products available!</p>}
		</>
	);
};

export default HomePage;
