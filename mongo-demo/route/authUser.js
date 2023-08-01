const express = require("express");
const router = express.Router();
const User = require("../modals/authModal");

const Joi = require("joi");
const bcrypt = require("bcrypt");

//for environment variable
require("dotenv").config({ path: "config/.env" });

const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send("Invalid Email or Password");
  }

  const validPasswod = await bcrypt.compare(req.body.password, user.password);

  if (!validPasswod) {
    return res.status(400).send("Invalid Email or Passwords");
  }

  const payload = {
    _id: user._id,
  };

  const token=user.generateAuthUser();

  // const options = { expiresIn: "1h" };
  // const token = jwt.sign(payload, secretKey, options);     //config.get , we will store the environment variables in config file in the environment variable

  res.send({ token, message: "User Login Succfully" });
});

module.exports = router;

const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().min(3).required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(user);
  return result;
};
