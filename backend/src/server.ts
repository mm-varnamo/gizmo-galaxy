import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import connectDB from '../config/db';
import productRoutes from '../routes/productRoutes';
import userRoutes from '../routes/userRoutes';
import createHttpError, { isHttpError } from 'http-errors';
import env from '../utils/envalid';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = env.PORT || 5000;

app.get('/', (req, res) => {
	res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
	next(createHttpError(404, 'Endpoint not found'));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
	console.error(error);
	let errorMessage = 'An unknown error occurred';
	let statusCode = 500;

	if (isHttpError(error)) {
		statusCode = error.status;
		errorMessage = error.message;
	}
	res.status(statusCode).json({ error: errorMessage });
});

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
