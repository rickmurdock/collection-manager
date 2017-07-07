const express  = require("express");
const updateCarRouter = express.Router();
const Car = require("../models/Car");

updateCarRouter.get("/:id", (req, res) => {
  Car.findById(req.params.id)
    .then(foundCar => {
      res.render("updateCar", { auto: foundCar});
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

updateCarRouter.post("/:id", (req, res) => {
  Car.updateOne({_id: req.params.id}, req.body)
    .then(updatedCar=> {
      res.redirect("/");
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = updateCarRouter;