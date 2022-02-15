const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Product } = require("../model/product");
const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async(req, res) => {
  const { error } = validateProduct(req.body); 
let product = new Product({
    title:req.body.title,
    price:req.body.price,
    quantity:req.body.quantity,
    category:req.body.category
})
  if (error) return res.status(401).send(error.details[0].message);
  product = await product.save()
  res.status(200).send()
});

router.get("/:id", auth, (req, res) => {
  const product = Product.find((p) => p.id === parseInt(req.params.id));
  if (!product)
    return res.status(401).send("Product with ID given is non existent");
  res.status(200).send()
});

router.get("/", (req, res) => {
  res.status(200).send()
});


router.put("/",async(req,res)=>{
    let product = await Product.findByIdAndUpdate(req.id, {
    $set:({
        title:req.body.title,
        price:req.body.price,
        quantity:req.body.quantity,
        category:req.body.category
    })
})
    res.status(200).send()
})


router.delete("/", async(req,res)=>{
    const result = await Product.findByIdAndRemove(req.id)
    if(!result) return res.status(400).send()
    res.status(200).send()
})
 

function validateProduct(product) {
  const schema = {
    title: Joi.string().min(5).required(),
    price: Joi.number().integer().required(),
    quantity: Joi.number().integer().required(),
    category: Joi.string().required(),
  };
  return Joi.validate(product, schema);
}

module.exports = router;
