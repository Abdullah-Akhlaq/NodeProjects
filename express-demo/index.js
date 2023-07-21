const express = require("express");
const Joi = require("joi");
const app = express();

// this is used to convert to data into json
app.use(express.json());

const courses = [
  {
    id: 1,
    name: "Chemistry",
  },
  {
    id: 2,
    name: "Physics",
  },
  {
    id: 3,
    name: "Math",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/posts/:year", (req, res) => {
  res.send(req.query); //required optional
  res.send(req.params); //required path
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((ele) => ele.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("This Project is not available."); //status is for checking status code and send is used for displaying messages
  }
  res.send(course);
});

//====post request====

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  //data validation if current creteria does not fullfill

  // if (!req.body.name || req.body.name.length < 3) {
  //   res.status(400).send("Cant find name");
  //   return
  // }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

//====put request=====

app.put("/api/courses/:id", (req, res) => {
  const { error } = validateCourse(req.body);

  const course = courses.find((ele) => ele.id === parseInt(req.params.id));

  if (!course) {
    //status is for checking status code and send is used for displaying messages
    return res.status(404).send("This Project is not available.");
  }

  if (error) {
    res.status(400).send(error.details);
    return;
  }

  course.name = req.body.name;
  res.send(course);
});

//====delete request ===
app.delete("/api/courses/:id", (req, res) => {
  const course = courses.filter((ele) => ele.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Given course ID is not avaialble");

  const courseindex = course.indexOf(course);
  courses.splice(courseindex, 1);
  res.send(course);
});

// use set PORT=5000 to set the port by your choice.
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on Port==> ${port}`));

//nodemon package  => used for live changes we dont need to run node again and again now

//==== validate course =====
const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(course);
  return result;
};
