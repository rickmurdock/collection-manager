const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const Car = require("./models/Car");
const app = express();
const port = process.env.port || 8005;
const dbURL = "mongodb://localhost:27017/classiCars";

app.use(bodyParser.json());

mongoose.connect(dbURL).then(function(err, db) {
  if (err) {
    console.log("error", err);
  }
  console.log("connected to classicCar DB.");
});

app.get("/cars", (req, res) => {
  Car.find()
  .then(foundCars=>{
    res.send(foundCars);
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

app.post("/cars", (req, res) => {
  let carData = req.body;
  let newCar = new Car(carData);
  console.log("newCar: ", newCar);
  newCar
    .save()
    .then(savedCar => {
      res.send(savedCar);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});


app.listen(port, () => {
  console.log(`Server is running on ${port}!`);
});