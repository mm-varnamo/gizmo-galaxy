import mongoose from 'mongoose';

interface User {
	id: mongoose.Types.ObjectId;
	name: string;
	email: string;
	isAdmin: boolean;
	createdAt: Date;
	updatedAt: Date;
}

declare global {
	namespace Express {
		interface Request {
			user?: User;
		}
	}
}
