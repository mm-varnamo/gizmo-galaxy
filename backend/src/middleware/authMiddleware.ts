import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/userModel';
import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import env from '../utils/envalid';

interface CustomJwtPayload extends JwtPayload {
	userId: string;
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
	let token;

	token = req.cookies.jwt;

	if (token) {
		try {
			const decoded = jwt.verify(token, env.JWT_SECRET) as CustomJwtPayload;

			if (!decoded.userId) {
				throw createHttpError(401, 'Token payload missing userId');
			}

			const user = await User.findById(decoded.userId).select('-password');

			if (!user) {
				throw createHttpError(401, 'User not found');
			}

			const { id, name, email, isAdmin, createdAt, updatedAt } = user;

			req.user = {
				id,
				name,
				email,
				isAdmin,
				createdAt,
				updatedAt,
			};

			next();
		} catch (error) {
			next(error);
		}
	} else {
		next(createHttpError(401, 'Invalid token'));
	}
};

export const isAdmin: RequestHandler = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		next(createHttpError(401, 'Invalid token (admin only)'));
	}
};
