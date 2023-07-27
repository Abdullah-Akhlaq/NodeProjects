const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isPublished: {
      type: Boolean,
    },
    age: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v > 9;
        },
        message: "Age must be above 10",
      },
    },
    date: { type: Date, default: Date.now },
    price: {
      type: Number,
      required: function () {
        return this.isPublished; //if isPublished is true then price is required
      },
    },
  });

  const Project = mongoose.model("Projects", userSchema);

  module.exports=Project