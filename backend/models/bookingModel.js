const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, "Invalid email format"],
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{10,15}$/, "Invalid phone number"],
  },
  numberOfTravelers: {
    type: Number,
    required: true,
    min: 1,
  },
  specialRequests: {
    type: String,
    default: "",
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TourPackage",
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
