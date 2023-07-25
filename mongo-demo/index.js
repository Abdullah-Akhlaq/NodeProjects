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
  isPublished: {
    type: Boolean,
  },
  age: {
    type: Number,
    required:true,
    validate: {
      validator: function (v) {
        return v > 9;
      },
      message: "Age must be above 10",
    },
  },
  email: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  price: {
    type: Number,
    required: function () {
      return this.isPublished; //if isPublished is true then price is required
    },
  },
});

// Create the model from the schema
//this is the document that will be created in the database
const User = mongoose.model("User", userSchema);

const createUserDB = async () => {
  const user = new User({
    name: "asd",
    age: 9,
    email: "a1010@gmail.com",
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

  const course = await User
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

  const USERS = await User.find().or(
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
  const user = await User.findById(id);

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
  const user = await User.deleteOne({ _id: id });

  console.log("user====", user);
};

// deleteUserDB("64ba2fe6d892b70957716712");
