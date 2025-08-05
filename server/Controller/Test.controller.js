const Test = require('../Model/Test.model')

const getTest=async(req,res)=>{
    try{
        const data = await Test.find()
        if(!data){
            res.status(500).json({message:"There is an error in fetch in the data"})
        }

        return res.status(200).json({
            success:true,
            data
        })
    }catch(error){
        console.error("Unable to fetch the data",error)
        return res.status(500).json({
            success:false,
            error:"Unable to fetch the data"
        })
    }
}

module.exports = {getTest}