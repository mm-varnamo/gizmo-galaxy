import { ReactNode } from 'react';

interface FormContainerProps {
	children: ReactNode;
}

const FormContainer = ({ children }: FormContainerProps) => {
	return <div>{children}</div>;
};

export default FormContainer;
