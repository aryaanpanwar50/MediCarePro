const mongoose = require('mongoose');
const dotenv = require('dotenv');

require('dotenv').config();

const connectDb = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error('MONGO_URL environment variable is not defined');
        }
        
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB is successfully connected");
    } catch (error) {
        console.error("MongoDB Connection error", error);
        throw error; // Re-throw to be caught by the server startup
    }
};

module.exports = connectDb;
