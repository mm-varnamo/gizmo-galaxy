import { Product as ProductModel } from '../models/product';

interface ProductProps {
	product: ProductModel;
}

const Product = ({ product }: ProductProps) => {
	return (
		<div className='product-card'>
			<a href={`/product/${product._id}`}>
				<img
					src={product.image}
					alt={product.name}
					className='product-card__image'
				/>
			</a>
			<div className='product-card__body'>
				<a href={`/product/${product._id}`}>
					<strong>{product.name}</strong>
				</a>
			</div>
			<div className='product-card__price'>
				<h3>${product.price}</h3>
			</div>
		</div>
	);
};

export default Product;
