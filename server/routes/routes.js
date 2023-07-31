module.exports = app => {
  const clients = require("../../db/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new applicants
  router.post("/", clients.create);

  // Retrieve all Tutorials
  // router.get("/", clients.findAll);

  app.use('/api/clients', router);
};
  