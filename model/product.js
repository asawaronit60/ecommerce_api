const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price : {
        type: Number,
        default:0,
        required:true
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }
})

productSchema.set('toJSON', {
    virtuals: true,
});

const Product = new mongoose.model('Product' , productSchema)
module.exports = Product;