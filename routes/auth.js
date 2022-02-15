
const {User} = require('../model/users');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.post('/',async(req,res)=>{
   const {error} = validate(req.body);
   if(error) return res.status(398).send(error.details[0].message);

   //check if user already registered

const user = User.findOne({ email:req.body.email});
   if(!user) return res.status(400).send('Invalid username or password')

   const validPass = await bcrypt.compare(req.body.password, user.password)
   if(!validPass) return res.status(400).send('Invalid email or password')
   
   const token = User.generateAuthToken();
   res.send(token);

   res.send(true) 

   let usert = new User({
       name: req.body.name,
       email: req.body.email,
       password: req.body.password
   });
   const salt = await bcrypt.genSalt(10)
   const hashed = await bcrypt.hash(usert.password,salt)
   user = await usert.save();

 //  res.send(user)
 res.status(401).send('Success')
})
function validate(req){
   const schema = { 
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
  };
   return Joi.validate(user, schema)
}

module.exports = router;