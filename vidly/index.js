const express = require("express");
const helmet = require("helmet");
const app = express();
const morgan = require("morgan");
const Joi = require("joi");
const logger = require("./logger"); // import middle ware

//===build in the 3rd party method to use =====

app.use(express.json());
app.use(helmet()); // secure the http routes
// app.use(morgan("tiny")); // log the http request that we hit

app.use(logger); // ===custom middle ware ===
//build in props
app.use(express.urlencoded({ extended: true })); //used to send encoded text (as a body) in the url

app.use(express.static("public")); // public static data

//=====setting the environment of the library whether it work on which envirnoment======

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log('app.get("env")', app.get("env"));
// process.env.NODE_ENV;
// app.get("env"); //by default the envirnoment is in the development level

//set NODE_ENV=production
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("morgan working ");
}

//====array of objects=====
const Project = [
  {
    id: 1,
    name: "Project",
    genre: "Action",
  },
  {
    id: 2,
    name: "Project",
    genre: "Horror",
  },
  {
    id: 3,
    name: "Project",
    genre: "Light",
  },
  {
    id: 4,
    name: "Project",
    genre: "Dark",
  },
];

app.post("/api/movies", (req, res) => {
  const { error } = validateMovies(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = {
    id: Project.length + 1,
    name: req.body.name,
  };
  Project.push(course);
  res.send(course);
});

app.get("/api/project", (req, res) => {
  res.send(Project);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("listening on Port 4000"));

const validateMovies = (movie) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(movie);
  return result;
};
