import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import {
	useUpdateProductMutation,
	useGetProductDetailsQuery,
} from '../slices/productsApiSlice';
import isFetchBaseQueryError from '../utils/fetchErrorHandler';
import { ApiError } from '../types/apiTypes';

const ProductEditPage = () => {
	const { id: productId } = useParams();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: '',
		price: 0,
		image: '',
		brand: '',
		category: '',
		countInStock: 0,
		description: '',
	});

	const {
		data: product,
		isLoading,
		refetch,
		error,
	} = useGetProductDetailsQuery(productId);

	const [updateProduct, { isLoading: updateProductIsLoading }] =
		useUpdateProductMutation();

	useEffect(() => {
		if (product) {
			setFormData(product);
		}
	}, [product]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const updatedProduct = { _id: productId, ...formData };

		try {
			await updateProduct(updatedProduct).unwrap();

			toast.success('Product updated');
			navigate('/admin/productlist');
		} catch (error) {
			const apiError = error as ApiError;
			toast.error(apiError?.data?.error || apiError.error);
		}
	};

	return (
		<>
			<Link to='/admin/productlist'>Go Back</Link>
			<FormContainer>
				<h1>Edit Product</h1>
				{updateProductIsLoading && (
					<Loader loading={updateProductIsLoading} size={10} />
				)}
				{isLoading ? (
					<Loader loading={isLoading} size={10} />
				) : error && isFetchBaseQueryError(error) ? (
					<Message type='alert'>
						{error.data &&
						typeof error.data === 'object' &&
						'error' in error.data
							? String(error.data.error)
							: 'Unknown Error'}
					</Message>
				) : (
					<form onSubmit={onSubmitHandler}>
						<div>
							<label htmlFor='name'>Name: </label>
							<input
								name='name'
								id='name'
								type='text'
								placeholder='Enter product name'
								value={formData.name}
								onChange={handleChange}
							/>
						</div>

						<div>
							<label htmlFor='price'>Price: </label>
							<input
								name='price'
								id='price'
								type='number'
								placeholder='Enter price'
								value={formData.price}
								onChange={handleChange}
							/>
						</div>

						<div>{/* IMAGE INPUT PLACEHOLDER */}</div>

						<div>
							<label htmlFor='brand'>Brand: </label>
							<input
								name='brand'
								id='brand'
								type='text'
								placeholder='Enter brand'
								value={formData.brand}
								onChange={handleChange}
							/>
						</div>

						<div>
							<label htmlFor='category'>Category: </label>
							<input
								name='category'
								id='category'
								type='text'
								placeholder='Enter category'
								value={formData.category}
								onChange={handleChange}
							/>
						</div>

						<div>
							<label htmlFor='countInStock'>Count in stock: </label>
							<input
								name='countInStock'
								id='countInStock'
								type='number'
								placeholder='Enter count in stock'
								value={formData.countInStock}
								onChange={handleChange}
							/>
						</div>

						<div>
							<label htmlFor='description'>Description: </label>
							<textarea
								name='description'
								id='description'
								placeholder='Enter description'
								value={formData.description}
								onChange={handleChange}
							/>
						</div>

						<button type='submit'>Submit</button>
					</form>
				)}
			</FormContainer>
		</>
	);
};

export default ProductEditPage;
