const { type } = require('joi/lib/types/object');
const mongoose = require('mongoose');

const orderItem = new mongoose.Schema({
  productID: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const orderSchema = new mongoose.Schema({
  userID: {
    type: String,
  },
  orderID: {
    type: String,
  },
  orderComplete: {
    type: Boolean,
    default: false,
  },
  orderItems: [orderItem],
  orderAmount: {
    type: Number,
  },
});

const Order = mongoose.model('Order', orderSchema);
exports.Order = Order;
