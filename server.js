/********************************************************************************
 *  WEB322 – Assignment 02
 *
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *
 *  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 *  Name: Lap Fai Tam Student ID: 126575232 Date: 2024-10-01
 *
 ********************************************************************************/

const projectData = require("./modules/projects");

const express = require("express");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
  projectData.initialize();
});

//app.use(express.static(__dirname + '/data'));

app.get("/", (req, res) => {
  res.send("Assignment 2: Lap Fai Tam - 126575232");
});

let needInit = true;
app.use(async (req, res, next) => {
  if (needInit) {
    await projectData.initialize();
    needInit = false;
  });

app.get("/solutions/projects", (req, res) => {
  projectData
    .getProjects()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/solutions/projects/:id(\\d+)", (req, res) => {
  projectData
    .getProjectById(parseInt(req.params.id))
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/solutions/projects/:sector([a-zA-Z]+)", (req, res) => {
  projectData
    .getProjectsBySector(req.params.sector)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});
