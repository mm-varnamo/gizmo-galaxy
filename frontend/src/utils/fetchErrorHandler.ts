import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const isFetchBaseQueryError = (error: any): error is FetchBaseQueryError => {
	return typeof error.status !== 'undefined';
};

export default isFetchBaseQueryError;
