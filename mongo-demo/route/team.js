const Teams = require("../modals/teamsModal");
const Joi = require("joi");

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const AdminCheckHandler = require("../middleware/admin");

router.get("/:id", auth, async (req, res) => {
  console.log(req.params.id);
  const teams = await Teams.findOne({ _id: req.params.id });
  res.send(teams);
});

router.get("/", auth, async (req, res) => {
  const teams = await Teams.find({}).select("-date"); // sele
  res.send(teams);
});

router.delete("/:id", [auth, AdminCheckHandler], async (req, res) => {
  const teams = await Teams.findByIdAndDelete(req.params.id);

  if (!teams) {
    res.status(404).send("The Team with given Id is not available");
  }
  res.send(teams);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateProject(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  }

  //   let team = await Teams.findOne({ name: req.body.name });
  //   if (team) {
  //     res.status(400).send("team Already Exist");
  //   }
  let team;
  team = Teams({
    name: req.body.name,
    category: req.body.category,
  });

  const result = await team.save();
  res.send(result);
});

module.exports = router;

const validateProject = (project) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    category: Joi.string().min(5).required(),
  });

  return schema.validate(project);
};
