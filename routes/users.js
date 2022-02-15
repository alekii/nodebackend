const auth = require("../middleware/auth");
const config = require("config");
const jwt = require("jsonwebtoken");
const { User, validateUser } = require("../model/users");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if user already registered
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(401).send("User already registered");
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(user.name, user.email, user.password);

  res.status(200).send();
});

router.get("/", (req, res) => {
  res.send(User.find);
});

router.get("/current", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

//validate input
function validate(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(user, schema);
}

module.exports = router;
