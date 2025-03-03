import Product from '../components/Product';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import isFetchBaseQueryError from '../utils/fetchErrorHandler';
import PaginationLinks from '../components/PaginationLinks';

const HomePage = () => {
	const { pageNumber } = useParams();

	const { data, isLoading, error } = useGetProductsQuery(pageNumber);
	console.log(data);
	return (
		<>
			{isLoading && <Loader loading={isLoading} size={100} />}
			{error && isFetchBaseQueryError(error) && (
				<Message type='alert'>
					{error.data && typeof error.data === 'object' && 'error' in error.data
						? String(error.data.error)
						: 'Unknown Error'}
				</Message>
			)}
			{!data || !data.products || data.products.length === 0 ? (
				<h2>No products found!</h2>
			) : (
				<>
					<h1>Latest Products</h1>
					<ul>
						{data.products.map((product: any) => (
							<li key={product._id}>
								<Product product={product} />
							</li>
						))}
					</ul>
				</>
			)}
			{data && <PaginationLinks pages={data.pages} activePage={data.page} />}
		</>
	);
};

export default HomePage;
