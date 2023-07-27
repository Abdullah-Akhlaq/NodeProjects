const mongoose = require("mongoose");

 const authSignUpSchema = new mongoose.Schema({
  name: { type: String, min: 3, max: 10},
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

const User = mongoose.model("usersDetails", authSignUpSchema);

module.exports = User;
