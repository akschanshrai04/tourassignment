const Booking = require("../models/bookingModel");
const TourPackage = require("../models/tourModel");


exports.createBooking = async (req, res) => {
  try {
    const { customerName, email, phoneNumber, numberOfTravelers, specialRequests, packageId } = req.body;

    
    const tourPackage = await TourPackage.findById(packageId);
    if (!tourPackage) return res.status(404).json({ error: "Package not found" });

    const totalPrice = tourPackage.price * numberOfTravelers;

    
    const booking = new Booking({
      customerName,
      email,
      phoneNumber,
      numberOfTravelers,
      specialRequests,
      package: packageId,
      totalPrice,
    });

    await booking.save();

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (err) {
    res.status(500).json({ error: "Failed to create booking" });
  }
};



exports.getbookbyid = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Looking for booking with ID: ${id}`);  

    const bookingid = await Booking.findById(id);

    if (!bookingid) {
      return res.status(404).json({ error: "Package not found" });
    }
    
    res.status(200).json(bookingid);

  } catch (err) {
    console.log("err : ", err);
    res.status(500).json({ error: "Failed to fetch package details" });
  }
};

exports = module.exports


