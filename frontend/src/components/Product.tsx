import { Product as ProductModel } from '../models/product';
import { Link } from 'react-router-dom';
import Rating from './Rating';

interface ProductProps {
	product: ProductModel;
}

const Product = ({ product }: ProductProps) => {
	return (
		<div className='product-card'>
			<Link to={`/product/${product._id}`}>
				<img
					src={product.image}
					alt={product.name}
					className='product-card__image'
				/>
			</Link>
			<div className='product-card__body'>
				<Link to={`/product/${product._id}`}>
					<strong>{product.name}</strong>
				</Link>
				<div className='product-card__rating'>
					<Rating value={product.rating} numReviews={product.numReviews} />
				</div>
			</div>
			<div className='product-card__price'>
				<h3>{product.price}&euro;</h3>
			</div>
		</div>
	);
};

export default Product;
