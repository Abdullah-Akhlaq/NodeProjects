// server.listen(7000)
const express = require("express");
const app = express();
app.use(express.json());

const userAuth = require("./route/user");
const Project=require("./route/project")


//route
app.use("/api/user",userAuth);
app.use('/api/project',Project)

const mongoose = require("mongoose");
// Connect to the MongoDB database
async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://0.0.0.0:27017/mogno-demo-db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

connectToDatabase();

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("listening on Port 4000"));
