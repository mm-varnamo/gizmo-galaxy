import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface RatingProps {
	value: number;
	numReviews: number;
}

const Rating = ({ value, numReviews }: RatingProps) => {
	const renderStar = (index: number) => {
		if (value >= index) return <FaStar />;
		if (value >= index - 0.5) return <FaStarHalfAlt />;
		return <FaRegStar />;
	};

	return (
		<div className='rating'>
			{[1, 2, 3, 4, 5].map((index) => (
				<span className='rating__star'>{renderStar(index)}</span>
			))}
			<span className='rating__reviews'>
				{numReviews ? `${numReviews} reviews` : '0 reviews'}
			</span>
		</div>
	);
};

export default Rating;
