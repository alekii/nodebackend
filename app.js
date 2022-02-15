require('dotenv').config();
const config= require('config')
const Joi = require('joi');
const products = require('./routes/products')
const users = require('./routes/users')
const orders = require('./routes/orders')
//const auth = require('./middleware/auth')
const express = require('express');
const { Mongoose } = require('mongoose');
const app = express()

// if(!config.get('jwtPrivateKey')){
//     console.error('FATAL ERROR: jwtPrivateKey not defined')
//     process.exit(1)
// } 

//app.use(express.urlencoded({extended:true}));
require('./startup/db')()

app.use(express.json());
app.use('/api/products', products);
app.use('/api/users', users)
app.use('/api/orders', orders)
//app.use('/api/auth', auth)

const port = process.env.PORT || 3000

const server = app.listen(port, ()=> console.log(`Listening on port ${port}...`));

module.exports = server 
