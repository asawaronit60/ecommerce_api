const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A user must have a name']
    },
    address:{
        type:String,
        required:[true, 'A user must have  a address']
    },
    phone:{
        type:Number,
        unique:true,
        required:[true,'A user must have a phone number'],
    },
    email:{
        type:String,
        unique:true,
        required:[true , 'a user must have an email account']
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required:true
    },
    myOrders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    }],
    totalPrice:{
        type:Number,
        default:0,
        min:0
    },
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    zip :{
        type: String,
        default: ''
    },
     passwordHash: {
        type: String,
        required: true,
    },
})


userSchema.set('toJSON', {
    virtuals: true,
});



const User = new mongoose.model('User',userSchema)

module.exports = User;