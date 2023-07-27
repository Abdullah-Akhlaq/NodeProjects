const UserAuth = require("../schema/authSchema");
const express = require("express");
const router = express.Router();
router.use(express.json());

const Joi=require('joi');



router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  console.log("req.body", req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const newUser = UserAuth({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const result = await newUser.save();
  res.send(result);
});

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),

  });

  const result = schema.validate(user);
  return result;
};


module.exports = router;
