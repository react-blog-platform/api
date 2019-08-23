import mongoose from 'mongoose';

export default async callback => {
	// connect to a database if needed, then pass it to `callback`:
	const mongoConnection = await mongoose.connect('mongodb://localhost/myblog', { useCreateIndex: true, useNewUrlParser: true });
	callback(mongoConnection);
}