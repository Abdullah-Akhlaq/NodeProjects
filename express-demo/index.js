const express = require("express");
const app = express();

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

app.get("/api/course", (req, res) => {
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

app.post("api/courses", (req, res) => {
  const course = {
    id: course.length + 1,
    name: req.body.name,
  };
  course.push(course);
  res.send(course);
});

// use set PORT=5000 to set the port by your choice.
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on Port==> ${port}`));

//nodemon package  => used for live changes we dont need to run node again and again now
