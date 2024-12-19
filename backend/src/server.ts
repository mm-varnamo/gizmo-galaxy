import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env') });
import products from '../data/products';

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send('API is running...');
});

app.get('/api/products', (req, res) => {
	res.json(products);
});

app.get('/api/products/:id', (req, res) => {
	const product = products.find((product) => product._id === req.params.id);
	res.json(product);
});

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
