

const projects =require('./routes/projects');
const express=require('express');
const app =express()
app.use('/api/projects', projects)
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());


app.get("/api/projectView", (req, res) => {
  res.render("index", {
    title: "My Express App ",
    message:
      " Using view engine pug to display data/ when we are building resetfull api we don't need this ",
  });
  // res.send(Project);
});


const port = process.env.PORT || 4000;
app.listen(port, () => console.log("listening on Port 4000"));

