const express = require("express");
const bodyParser = require("body-parser");
const mustacheExpress = require('mustache-express');
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const Car = require("./models/Car");
const indexRouter = require('./routes/indexRoutes');
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

// MIDDLEWARE
app.use(express.static('public'));
app.use(express.static('views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// DB CONNECTION
mongoose.connect(dbURL).then(function(err, db) {
  if (err) {
    console.log("error", err);
  }
  console.log("connected to classicCar DB.");
});

// ROUTES
app.use('/', indexRouter);
app.use('/addCar', addCarRouter);
app.use('/updateCar', updateCarRouter);
app.use('/deleteCar', deleteCarRouter);

// LISTENER
app.listen(port, () => {
  console.log(`Server is running on ${port}!`);
});