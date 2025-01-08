import mongoose from 'mongoose';
import env from '../utils/envalid';
import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginUser: RequestHandler = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!email || !password) {
			throw createHttpError(400, 'Invalid credentials');
		}

		if (!user) {
			throw createHttpError(401, 'Invalid credentials');
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			throw createHttpError(401, 'Invalid credentials');
		}

		const token = jwt.sign({ userId: user._id }, env.JWT_SECRET, {
			expiresIn: '30d',
		});

		res.cookie('jwt', token, {
			httpOnly: true,
			secure: env.NODE_ENV !== 'development',
			sameSite: 'strict',
			maxAge: 30 * 24 * 60 * 60 * 1000,
		});

		const { _id, name, isAdmin } = user;

		res.status(201).json({
			_id,
			name,
			email,
			isAdmin,
		});
	} catch (error) {
		next(error);
	}
};

export const registerUser: RequestHandler = async (req, res, next) => {
	res.send('register user');
};

export const logoutUser: RequestHandler = async (req, res, next) => {
	res.cookie('jwt', '', {
		httpOnly: true,
		expires: new Date(0),
	});
	res.status(200).json({ message: 'Logged out successfully' });
};

export const getUserProfile: RequestHandler = async (req, res, next) => {
	res.send('get user profile');
};

export const updateUserProfile: RequestHandler = async (req, res, next) => {
	res.send('update user profile');
};

export const getUsers: RequestHandler = async (req, res, next) => {
	res.send('get all users (admin)');
};

export const getUserById: RequestHandler = async (req, res, next) => {
	res.send('get user by ID (admin)');
};

export const deleteUser: RequestHandler = async (req, res, next) => {
	res.send('delete user (admin)');
};

export const updateUser: RequestHandler = async (req, res, next) => {
	res.send('update user (admin)');
};
