import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const mongoUri = process.env.MONGO_URI;

		if (!mongoUri) {
			throw new Error('MONGO_URI is not defined');
		}

		const conn = await mongoose.connect(mongoUri);

		console.log(`Connected to MongoDB: ${conn.connection.host}`);
	} catch (error) {
		if (error instanceof Error) {
			console.log(`MongoDB connection error: ${error.message}`);
		} else {
			console.log(`Unexpected error: ${error}`);
		}
		process.exit(1);
	}
};

export default connectDB;
