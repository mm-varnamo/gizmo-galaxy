import { DotLoader } from 'react-spinners';

interface LoaderProps {
	color?: string;
	loading: boolean;
	size: number;
}

const Loader = ({ color = '#32CD32', loading, size }: LoaderProps) => {
	return (
		<DotLoader
			color={color}
			loading={loading}
			size={size}
			aria-label='Loading Spinner'
		/>
	);
};

export default Loader;
