const { type } = require("joi/lib/types/object");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userID:{
        type:String, 
    },
    orderID:{
        type:String
    },
    orderComplete:{
        type:Boolean, 
        default:false
    },
    orderItems:[ 
        { 
            productID:{
                type:String
            },
            quantity:{
                type:Number,
                default:1
            } 
        }
    ],
    orderAmount:{
        type:Number, 
        
    }
})

const Order = mongoose.model('Order', orderSchema)
exports.Order = Order