const express = require("express");
const bodyParser = require("body-parser");
const mustacheExpress = require('mustache-express');
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const Car = require("./models/Car");
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


app.get("/addCar", (req, res) => {
  res.render('addCar');
});

app.get("/cars/:id", (req, res) => {
  Car.findById(req.params.id)
    .then(foundCar=>{
      console.log("Model", foundCar.model);
      res.send(foundCar);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.post("/addCar", (req, res) => {
  let carData = req.body;
  console.log('CAR DATA ====', carData);
  let newCar = new Car(carData);
  console.log("newCar: ", newCar);
  newCar
    .save()
    .then(savedCar => {
      // res.send(savedCar);
      res.redirect("/");
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.put("/cars/:id", (req, res) => {
  Car.updateOne({_id: req.params.id}, req.body)
  .then(updatedCar=> {
    res.send(updatedCar);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.delete("/cars/:id", (req, res) => {
  Car.deleteOne({ _id: req.params.id }) 
  .then(() => {
    res.send("Deleted record");
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}!`);
});