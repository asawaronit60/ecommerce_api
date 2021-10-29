const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
     city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    }, 
    passwordHash: {
        type: String,
        required: true,
    },
})