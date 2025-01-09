import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken';

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

		generateToken(res, user._id);

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
	const { name, email, password: passwordRaw } = req.body;

	try {
		if (!name || !email || !passwordRaw) {
			throw createHttpError(400, 'Parameters missing');
		}

		const userExists = await User.findOne({ email });

		if (userExists) {
			throw createHttpError(400, 'User already exists');
		}

		const passwordHashed = await bcrypt.hash(passwordRaw, 12);

		const user = await User.create({ name, email, password: passwordHashed });

		if (user) {
			generateToken(res, user._id);

			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
			});
		} else {
			throw createHttpError(400, 'Invalid user data');
		}
	} catch (error) {
		next(error);
	}
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
