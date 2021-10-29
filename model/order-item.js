const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
    quantity:{
        type:Number,
        required:true,
        default:1,
        min :1
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }
})

const orderItem = new mongoose.model('orderItem' , orderItemSchema)

module.exports = orderItem