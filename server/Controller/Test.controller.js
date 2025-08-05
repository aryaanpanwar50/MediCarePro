const Test = require('../Model/Test.model')
const mongoose = require('mongoose')

const getTest=async(req,res)=>{
    try{
        // Check if database is connected
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({
                success: false,
                message: "Database connection not ready",
                connectionState: mongoose.connection.readyState
            });
        }

        const data = await Test.find().maxTimeMS(5000); // Set 5 second timeout for the query
        
        return res.status(200).json({
            success:true,
            count: data.length,
            data
        })
    }catch(error){
        console.error("Unable to fetch the data",error)
        
        // Handle specific timeout errors
        if (error.name === 'MongooseError' && error.message.includes('buffering timed out')) {
            return res.status(503).json({
                success: false,
                message: "Database connection timeout. Please try again later.",
                error: "Connection timeout"
            });
        }
        
        return res.status(500).json({
            success:false,
            message:"Unable to fetch the data",
            error: error.message
        })
    }
}

module.exports = {getTest}