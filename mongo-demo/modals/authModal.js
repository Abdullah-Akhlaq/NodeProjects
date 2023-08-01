const mongoose = require("mongoose");

const secretKey = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken')

const authSignUpSchema = new mongoose.Schema({
  name: { type: String, min: 3, max: 10 },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});
//these are pre-defined method which we can use when we are writting same logic and want to use multiple time
authSignUpSchema.methods.generateAuthUser = function () {
  const token = jwt.sign({_id:this._id}, secretKey, { expiresIn: "1h" });
  return token;
};

const User = mongoose.model("usersDetails", authSignUpSchema);

module.exports = User;
