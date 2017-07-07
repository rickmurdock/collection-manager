const express = require("express");
const bodyParser = require("body-parser");
const mustacheExpress = require('mustache-express');
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const Car = require("./models/Car");
const addCarRouter = require('./routes/addCarRoutes');
const deleteCarRouter = require('./routes/deleteCarRoutes');
const updateCarRouter = require('./routes/updateCarRoutes');
const app = express();
const port = process.env.port || 8005;
const dbURL = "mongodb://localhost:27017/classiCars";

// RENDER ENGINE
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache")

app.use(express.static('public'));
app.use("/", express.static(__dirname + "/views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(dbURL).then(function(err, db) {
  if (err) {
    console.log("error", err);
  }
  console.log("connected to classicCar DB.");
});

// ROUTES
app.use('/addCar', addCarRouter);
app.use('/updateCar', updateCarRouter);
app.use('/deleteCar', deleteCarRouter);

app.get("/", (req, res) => {
  Car.find()
  .then(foundCars=>{
    //  res.send(foundCars);

    res.render("index", { autos: foundCars});
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}!`);
});