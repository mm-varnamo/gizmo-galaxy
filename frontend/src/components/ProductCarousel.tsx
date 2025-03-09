import { Link } from 'react-router-dom';
import Loader from './Loader';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import { useCallback, useEffect, useState } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { FaCircle } from 'react-icons/fa6';

const ProductCarousel = () => {
	const [index, setIndex] = useState<number>(0);
	const { data: products, isLoading, error } = useGetTopProductsQuery();

	const onNextHandler = useCallback(() => {
		if (products && index === products.length - 1) {
			setIndex(0);
		} else {
			setIndex((index) => index + 1);
		}
	}, [products, index]);

	const onLastHandler = () => {
		if (index === 0) {
			setIndex(2);
		} else {
			setIndex((index) => index - 1);
		}
	};

	useEffect(() => {
		if (!products) return;

		const interval = setInterval(() => {
			onNextHandler();
		}, 3000);

		return () => clearInterval(interval);
	}, [products, onNextHandler]);

	if (error) {
		return <p>Error loading products</p>;
	}

	if (!products || products.length === 0) {
		return <Message type='information'>No products to show</Message>;
	}

	return (
		<>
			{isLoading ? (
				<Loader loading={isLoading} size={10} />
			) : (
				<>
					<h2>Check out our most popular products</h2>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<MdArrowBackIos onClick={onLastHandler} />
						<Link
							style={{ position: 'relative' }}
							to={`/product/${products[index]._id}`}
						>
							<img src={products[index].image} alt={products[index].name} />
							<div
								style={{
									display: 'flex',
									position: 'absolute',
									top: '95%',
									left: '50%',
									transform: 'translate(-50%, -50%)',
								}}
							>
								<FaCircle
									style={{
										fill: index === 0 ? 'white' : 'grey',
									}}
								/>
								<FaCircle style={{ fill: index === 1 ? 'white' : 'grey' }} />
								<FaCircle style={{ fill: index === 2 ? 'white' : 'grey' }} />
							</div>
						</Link>
						<MdArrowForwardIos onClick={onNextHandler} />
					</div>
				</>
			)}
		</>
	);
};

export default ProductCarousel;
