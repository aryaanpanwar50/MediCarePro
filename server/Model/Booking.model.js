const mongoose = require('mongoose')

const bookingModel = mongoose.Schema({
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient'
    },
    testId:{
        type:mongoose.Schema.ObjectId,
        ref:'Test'
    },
   

},{timestamps:true})

module.exports = mongoose.model('Booking',bookingModel)