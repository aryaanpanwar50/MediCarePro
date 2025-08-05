const mongoose = require('mongoose')


const patientModel = mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
    
})

module.exports = mongoose.model('Patient',patientModel)