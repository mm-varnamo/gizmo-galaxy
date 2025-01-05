import mongoose from 'mongoose';
import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import User from '../models/userModel';

export const loginUser: RequestHandler = async (req, res, next) => {
	res.send('login user');
};

export const registerUser: RequestHandler = async (req, res, next) => {
	res.send('register user');
};

export const logoutUser: RequestHandler = async (req, res, next) => {
	res.send('logout user');
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
