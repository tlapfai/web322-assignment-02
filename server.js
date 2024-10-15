/********************************************************************************
 *  WEB322 – Assignment 03
 *
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *
 *  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 *  Name: Lap Fai Tam Student ID: 126575232 Date: 2024-10-18
 *
 ********************************************************************************/

const projectData = require("./modules/projects");
const path = require("path");
const express = require("express");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
let initialized = false;

app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
  //projectData.initialize();
});

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  if (!initialized) {
    projectData.initialize().then(() => {
      initialized = true;
    });
  }
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/solutions/projects", (req, res) => {
  if (req.query.sector) {
    projectData
      .getProjectsBySector(req.query.sector)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
      });
  } else {
    projectData
      .getProjects()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
      });
  }
});

app.get("/solutions/projects/:id(\\d+)", (req, res) => {
  projectData
    .getProjectById(parseInt(req.params.id))
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
    });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "/public/404.html"));
});
