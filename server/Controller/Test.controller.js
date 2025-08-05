const Test = require('../Model/Test.model')

const getTest=async(req,res)=>{
    try{
        const data = await Test.find()
        
        return res.status(200).json({
            success:true,
            data
        })
    }catch(error){
        console.error("Unable to fetch the data",error)
        return res.status(500).json({
            success:false,
            message:"Unable to fetch the data",
            error: error.message
        })
    }
}

module.exports = {getTest}