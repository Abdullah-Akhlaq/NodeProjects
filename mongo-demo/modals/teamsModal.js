const mongoose=require('mongoose')

const teamsSchema = new mongoose.Schema({
    name: { type: String, required: true },

    category: {
      type: String,
      required: true,
    },
    date: { type: Date, default: Date.now },
  });

  const Teams = mongoose.model("Teamss", teamsSchema);

  module.exports=Teams