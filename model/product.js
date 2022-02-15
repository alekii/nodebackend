 const mongoose = require("mongoose");

const prodSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:5,
        maxlength:15
    },
    price:{
        type:Number,
        required:true,
        
    },
    quantity:{
        type:Number,
        required:true
        
    },
    category:{
        type:String,
        required:true 
    }
    
})
const Product = mongoose.model('Product', prodSchema)
exports.Product = Product
 