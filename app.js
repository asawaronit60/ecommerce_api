const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const user = require('./routes/user')
const product = require('./routes/product')
const order = require('./routes/order')
const cookieParser = require('cookie-parser')
const app = express();
dotenv.config({ path: "./config.env" });
mongoose.connect('mongodb://localhost:27017/myShop', {useNewUrlParser: true,useUnifiedTopology: true }).then(()=>{console.log('connected to db successfully');})
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))


app.use('/api/v1/product',product)
app.use('/api/v1/user',user)
app.use('/api/v1/order',order)
app.listen(3000,()=>{
    console.log('server is running at http://locahost:3000')
})
