const express = require("express");
const router = express.Router();
const User = require("../modals/authModal");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
  const options = { expiresIn: "1h" };
  const token = jwt.sign(user, "scretKey", options);

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
