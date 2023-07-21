// server.listen(7000)

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

// Define the schema

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
});

// Create the model from the schema
//this is the document that will be created in the database
const User = mongoose.model("User", userSchema);

const createUserDB = async () => {
  const user = new User({
    name: "ali",
    age: 20,
    email: "ali@gmail.com",
  });
  const result = await user.save();
  console.log(result);
};
// createUserDB()

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

  const course = await User
    //  find({ age: { $in: [12] } })
    .find()
    .or({ name: "Abdulla" }, { age: 22 })
    .skip(pageNumber - 1 * pageSize)
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

  const USERS = await User.find()
    .or({ name: /.*ali.*/ }, { age: { $gte: 10 } })
    // skip(pageNumber-0 * pageSize)
    .limit(pageSize)
    .sort({ name: 1 }) // sort array by name if 1 else -1 in desending
    // .count()
    .select({
      name: 1, // this will select only name from array and return only name attribute
    });
  console.log(USERS);
};
getExerciseDB();
