const User = require("../modals/authModal");
const express = require("express");
const router = express.Router();
router.use(express.json());
const _ = require("lodash");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const secretKey = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken')

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  console.log("req.body", req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send("User Already Exist");

  const response = _.pick(req.body, ["name", "email", "password"]);
  user = User(
    response
    // {  name: req.body.name,
    //   email: req.body.email,
    //   password: req.body.password,}
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token=user.generateAuthUser();
  // const options = { expiresIn: "1h" };
  // const token = jwt.sign({user}, secretKey, options);

  res.header("x-auth-header", token).send(
    _.pick(user, ["name", "email", "password"])
    // result
  );
});

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().min(3).required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(user);
  return result;
};

module.exports = router;
