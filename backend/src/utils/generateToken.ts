import { Response } from 'express';
import env from '../utils/envalid';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const generateToken = (res: Response, userId: mongoose.Types.ObjectId) => {
	const token = jwt.sign({ userId }, env.JWT_SECRET, {
		expiresIn: '30d',
	});

	res.cookie('jwt', token, {
		httpOnly: true,
		secure: env.NODE_ENV !== 'development',
		sameSite: 'strict',
		maxAge: 30 * 24 * 60 * 60 * 1000,
	});
};

export default generateToken;
