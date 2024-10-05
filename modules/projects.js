const path = require("path");
//const projectData = require("../data/projectData");
//const sectorData = require("../data/sectorData");
// use path.join to resolve the path to the data files
const projectData = require(path.join(__dirname, "../data/projectData"));
const sectorData = require(path.join(__dirname, "../data/sectorData"));

let projects = [];

function initialize() {
  //should resolve with no data, once the operation is complete (ie: the "projects" array is filled with objects)
  /*projects = projectData.map((project) => ({
    ...project,
    sector: sectorData.find((sector) => sector.id === project.sector_id)
      .sector_name,
  }));
  */
  console.log(projectData);
  return new Promise((resolve, reject) => {
    if (projectData.length > 0) {
      projects = projectData.map((project) => ({
        ...project,
        sector: sectorData.find((sector) => sector.id === project.sector_id)
          .sector_name,
      }));
    }
    if (projects.length > 0) {
      resolve();
    } else {
      reject("unable to initialize projects");
    }
  });
}

function getProjects() {
  return new Promise((resolve, reject) => {
    if (projects.length > 0) {
      resolve(projects);
    } else {
      reject("unable to find projects");
    }
  });
}

function getProjectById(projectId) {
  const project = projects.find((project) => project.id === projectId);
  return new Promise((resolve, reject) => {
    if (project) {
      resolve(project);
    } else {
      reject("unable to find requested project");
    }
  });
}

function getProjectsBySector(sector) {
  const project = projects.filter((project) =>
    project.sector.toLowerCase().includes(sector.toLowerCase())
  );
  return new Promise((resolve, reject) => {
    if (project.length > 0) {
      resolve(project);
    } else {
      reject("unable to find requested project");
    }
  });
}

/*
initialize();
const temp = getProjectById(1);
console.log(temp);
*/

module.exports = {
  initialize,
  getProjects,
  getProjectById,
  getProjectsBySector,
};
