const express  = require("express");
const indexRouter = express.Router();
const Car = require("../models/Car");

indexRouter.get("/", (req, res) => {
  Car.find()
  .then(foundCars => {
    res.render("index", { autos: foundCars});
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

module.exports = indexRouter;