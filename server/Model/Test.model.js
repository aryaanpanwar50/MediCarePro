const mongoose = require('mongoose')


const testModel = mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    tat:String,
    category:String
})

module.exports = mongoose.model('Test',testModel)