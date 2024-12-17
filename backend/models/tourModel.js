const mongoose = require("mongoose");

const tourPackageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  availableDates: {
    type: [Date],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("TourPackage", tourPackageSchema);
