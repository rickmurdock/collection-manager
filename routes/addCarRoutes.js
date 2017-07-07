const express  = require("express");
const addCarRouter = express.Router();
const Car = require("../models/Car");

addCarRouter.get("/", (req, res) => {
  res.render('addCar');
});

addCarRouter.post("/", (req, res) => {
  let carData = req.body;
  let newCar = new Car(carData);
  newCar
    .save()
    .then(savedCar => {
      res.redirect("/");
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = addCarRouter;