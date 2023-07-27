const mongoose = require("mongoose");

 const authSignUpSchema = new mongoose.Schema({
  name: { type: String, min: 3, max: 10, require: true },
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

const UserAuth = mongoose.model("usersDetails", authSignUpSchema);

module.exports = UserAuth;
