// server.listen(7000)


const express = require("express");
const app = express();
app.use(express.json());

const userAuth = require("./route/user");
const Project = require("./schema/projectSchema");


//route
app.use("/api/userAuth",userAuth);

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



const createUserDB = async () => {
  const user = new Project({
    name: "RND",
    age: 20,
    isPublished: true,
    price: 32,
  });
  const result = await user.save();
  console.log(result);
};
createUserDB();

const getuserDB = async () => {
  //eq (equal)
  //ne (not equal)
  //gt (greater than)
  //gte (greater than or equal to )
  // lt (less than )
  //lte (less than or equal to )
  //in  (this will find the exact values which you want to find)
  // nin (not in )

  const pageNumber = 2;
  const pageSize = 1;

  const course = await Project
    //  find({ age: { $in: [12] } })
    .find()
    .or({ name: "Abdulla" }, { age: 22 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 }) // sort array by name if 1 else -1 in desending
    .count()
    .select({
      name: 1, // this will select only name from array and return only name attribute
    });
  console.log(course);
};
// getuserDB();

const getExerciseDB = async () => {
  //eq (equal)
  //ne (not equal)
  //gt (greater than)
  //gte (greater than or equal to )
  // lt (less than )
  //lte (less than or equal to )
  //in  (this will find the exact values which you want to find)
  // nin (not in )

  const pageNumber = 2;
  const pageSize = 10;

  const USERS = await Project.find().or(
    { name: /.*ali.*/ },
    { age: { $gte: 10 } }
  );
  // skip((pageNumber - 1) * pageSize)
  limit(pageSize)
    .sort({ name: 1 }) // sort array by name if 1 else -1 in desending
    // .count()
    .select({
      name: 1, // this will select only name from array and return only name attribute
    });
  console.log(USERS);
};
// getExerciseDB();

const updateUserDB = async (id) => {
  const user = await Project.findById(id);

  if (!user) {
    return;
  }
  user.name = "Updated Name";
  user.age = 20;

  connectToDatabase;
  const result = await user.save();

  console.log("result", result);
};

// updateUserDB("64ba2fe6d892b70957716712");

const deleteUserDB = async (id) => {
  const user = await Project.deleteOne({ _id: id });

  console.log("user====", user);
};

// deleteUserDB("64ba2fe6d892b70957716712");
