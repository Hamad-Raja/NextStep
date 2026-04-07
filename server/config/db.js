const mongoose = require('mongoose');

let isConnected;

const connectDB = async () => {
    if (isConnected) {
        console.log('Using existing database connection');
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        isConnected = conn.connection.readyState;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        // Let it throw so it logs properly on Vercel instead of a silent exit trap
        throw error;
    }
};

module.exports = connectDB;
