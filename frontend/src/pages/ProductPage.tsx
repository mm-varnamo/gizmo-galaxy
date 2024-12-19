import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import axios from 'axios';
import { Product as ProductModel } from '../models/product';
import { useEffect, useState } from 'react';

const ProductPage = () => {
	const [product, setProduct] = useState<ProductModel | null>(null);

	const { id: productId } = useParams();

	useEffect(() => {
		const fetchProduct = async () => {
			const { data } = await axios.get(`/api/products/${productId}`);
			setProduct(data);
		};

		fetchProduct();
	}, [productId]);

	return (
		<div>
			{!product && <p>Product not found</p>}
			{product && (
				<>
					<Link to='/'>&lt; Home</Link>
					<div>
						<img src={product.image} alt={product.name} />
						<h2>{product.name}</h2>
						<Rating value={product.rating} numReviews={product.numReviews} />
						<p>
							Price: <strong>{product.price}&euro;</strong>
						</p>
						<p>Description: {product.description}</p>
						<div>
							<p>
								Status:
								<strong>
									{product.countInStock > 0 ? ' In Stock' : ' Out of stock'}
								</strong>
							</p>
						</div>
						<div>
							<button type='button' disabled={product.countInStock === 0}>
								Add To Cart
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ProductPage;
