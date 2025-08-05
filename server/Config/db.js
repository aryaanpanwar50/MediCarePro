const mongoose = require('mongoose');
const dotenv = require('dotenv');

require('dotenv').config();

const connectDb = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error('MONGO_URL environment variable is not defined');
        }
        
        const connectionOptions = {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
            bufferMaxEntries: 0, // Disable mongoose buffering
            bufferCommands: false, // Disable mongoose buffering
        };
        
        await mongoose.connect(process.env.MONGO_URL, connectionOptions);
        console.log("MongoDB is successfully connected");
    } catch (error) {
        console.error("MongoDB Connection error", error);
        throw error; // Re-throw to be caught by the server startup
    }
};

module.exports = connectDb;
