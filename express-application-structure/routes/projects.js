const express=require('express');
const router=express.Router();
const Joi = require("joi");
router.use(express.json());

//====array of objects=====
const Project = [
    {
      id: 1,
      name: "Project",
     
    },
    {
      id: 2,
      name: "Projejkhkjct",
     
    },
    {
      id: 3,
      name: "Prokjhkjject",
     
    },
    {
      id: 4,
      name: "Projkhjkject",
    
    },
  ];


router.get("/", (req, res) => {
    res.send(Project);
  });

  //===post====
  router.post("/", (req, res) => {
    const { error } = validateProjects(req.body);
    console.log('req.body',req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    const course = {
      id: Project.length + 1,
      name: req?.body?.name,
    };
    Project.push(course);
    res.send(course);
  });
  
  //====put request=====
  router.put("/:id", (req, res) => {
    const { error } = validateCourse(req.body);
  
    const ProjectValue = Project.find(
      (ele) => ele.id === parseInt(req.params.id)
    );
  
    if (!ProjectValue) {
      //status is for checking status code and send is used for displaying messages
      return res.status(404).send("This Project is not available.");
    }
  
    if (error) {
      res.status(400).send(error.details);
      return;
    }
  
    ProjectValue.name = req.body.name;
    res.send(ProjectValue);
  });
  
  //====delete request ===
  router.delete("/:id", (req, res) => {
    const course = Project.filter((ele) => ele.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("Given course ID is not avaialble");
  
    const courseindex = course.indexOf(course);
    course.splice(courseindex, 1);
    res.send(course);
  });
  
  const validateProjects = (movie) => {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
    });
  
    const result = schema.validate(movie);
    return result;
  };
  


  module.exports=router
