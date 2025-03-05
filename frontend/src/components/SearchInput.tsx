import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SearchInput = () => {
	const navigate = useNavigate();
	const { keyword: urlKeyword } = useParams();
	const [keyword, setKeyword] = useState(urlKeyword || '');

	const onSubmitHandler = (e: React.FormEvent) => {
		e.preventDefault();

		if (keyword.trim()) {
			setKeyword('');
			navigate(`/search/${keyword}`);
		} else {
			navigate('/');
		}
	};

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value);
	};

	return (
		<form onSubmit={onSubmitHandler}>
			<input
				type='text'
				name='keyword'
				value={keyword}
				placeholder='Search Products...'
				onChange={onChangeHandler}
			/>
			<button type='submit'>Search</button>
		</form>
	);
};

export default SearchInput;
