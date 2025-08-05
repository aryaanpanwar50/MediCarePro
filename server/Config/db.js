const mongoose = require('mongoose');
const dotenv = require('dotenv');

require('dotenv').config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB is successfully connected");
    } catch (error) {
        console.error("MongoDB Connection error", error);
        process.exit(1);
    }
};

module.exports = connectDb;
