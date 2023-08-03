const Project = require("../modals/projectModal");
const Joi = require("joi");

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const { error } = validateProject(req.body);

  console.log("error", error);

  if (error) {
    res.status(400).send(error.details[0].message);
  }

  let project = await Project.findOne({ name: req.body.name });
  if (project) {
    res.status(400).send("Project Already Exist");
  }

  project = Project({
    name: req.body.name,
    age: req.body.age,
    isPublished: req.body.isPublished,
    price: req.body.price,
  });
  const result = await project.save();
  res.send(result);
});

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

module.exports = router;

const validateProject = (project) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    age: Joi.number().min(10).required(),
    isPublished: Joi.boolean().required(),
    price: Joi.when("isPublished", {
      is: true,
      then: Joi.number().required(),
      otherwise: Joi.number(),
    }),
  });

  return schema.validate(project);
};
