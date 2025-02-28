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
			throw createHttpError(400, 'Missing login credentials');
		}

		if (!user) {
			throw createHttpError(400, 'User not found');
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			throw createHttpError(401, 'Invalid credentials');
		}

		generateToken(res, user._id);

		const { id, name, isAdmin } = user;

		res.status(200).json({
			id,
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

			res.status(200).json({
				id: user._id,
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
	try {
		const user = await User.findById(req.user?.id);

		if (user) {
			res.status(201).json({
				id: user.id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
			});
		} else {
			throw createHttpError(404, 'User not found');
		}
	} catch (error) {
		next(error);
	}
};

export const updateUserProfile: RequestHandler = async (req, res, next) => {
	try {
		const user = await User.findById(req.user?.id);

		if (user) {
			user.name = req.body.name || user.name;
			user.email = req.body.email || user.email;

			if (req.body.password) {
				user.password = await bcrypt.hash(req.body.password, 12);
			}

			const updatedUser = await user.save();

			res.status(200).json({
				id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
			});
		} else {
			throw createHttpError(404, 'User not found');
		}
	} catch (error) {
		next(error);
	}
};

export const getUsers: RequestHandler = async (req, res, next) => {
	try {
		const users = await User.find({}).select('-password');

		if (!users) {
			throw createHttpError(404, 'No users not found');
		}

		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

export const getUserById: RequestHandler = async (req, res, next) => {
	try {
		const { id: userId } = req.params;

		const user = await User.findById(userId).select('-password');

		if (!user) {
			throw createHttpError(404, 'User not found');
		}

		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

export const deleteUser: RequestHandler = async (req, res, next) => {
	try {
		const { id: userId } = req.params;

		const user = await User.findById(userId);

		if (!user) {
			throw createHttpError(404, 'User not found');
		}

		if (user.isAdmin) {
			throw createHttpError(400, 'Admin deletion not allowed');
		}

		await user.deleteOne({ _id: userId });
		res.status(200).json({ message: 'User deleted successfully' });
	} catch (error) {
		next(error);
	}
};

export const updateUser: RequestHandler = async (req, res, next) => {
	try {
		const { id: userId } = req.params;

		const user = await User.findById(userId);

		if (!user) {
			throw createHttpError(404, 'User not found');
		}

		Object.assign(user, req.body);

		const updatedUser = await user.save();

		res.status(200).json(updatedUser);
	} catch (error) {
		next(error);
	}
};
