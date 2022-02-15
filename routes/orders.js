const { Order } = require('../model/order');
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();
router.post('/', async (req, res) => {
  let order = new Order(req.body);

  const result = await order.save();
  if (!result) return res.status(400).send();
  console.log(typeof req.body.orderItems);
  res.status(200).send();
});
module.exports = router;
