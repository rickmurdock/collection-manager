var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var carSchema = new Schema({
  vinNumber: {
    type: String,
    default: "unknown"
  },
  make: {
    type: String,
    required: true,
    default: "unknown"
  }, 
  model: {
    type: String,
    required: true,
    default: "unknown"
  },
  year: {
    type: Number,
    min: 1900,
    max: 2017
  },
  body: {
    bodyStyle: {
      type: String,
      enum: [
        "sedan", 
        "coupe", 
        "convertible", 
        "wagon", 
        "truck", 
        "van"
      ]
    },
    color: String,
  },
  driveTrain: {
    engine:  String,
    transmission: {
      type: String,
      enum: ["automatic", "manual"]
    },
    wheelDrive: {
      type: String,
      enum: ["2WD", "4WD", "AWD"]
    }
  }
});

// name of the collect, and the schema for the collection
module.exports = mongoose.model("Car", carSchema);