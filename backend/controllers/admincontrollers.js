const TourPackage = require("../models/tourModel");
const Booking = require("../models/bookingModel");

exports.addPackage = async (req, res) => {
  try {
    const { title, description, price, availableDates, image } = req.body;

    const newPackage = new TourPackage({
      title,
      description,
      price,
      availableDates,
      image,
    });

    await newPackage.save();

    res.status(201).json({ message: "Package added successfully", newPackage });
  } catch (err) {
    res.status(500).json({ error: "Failed to add package" });
  }
};


exports.updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPackage = await TourPackage.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedPackage) return res.status(404).json({ error: "Package not found" });

    res.status(200).json({ message: "Package updated successfully", updatedPackage });
  } catch (err) {
    res.status(500).json({ error: "Failed to update package" });
  }
};


exports.deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPackage = await TourPackage.findByIdAndDelete(id);

    if (!deletedPackage) return res.status(404).json({ error: "Package not found" });

    res.status(200).json({ message: "Package deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete package" });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const { title, minPrice, maxPrice, sortBy } = req.query;

    const query = {};
    if (title) query.title = { $regex: title, $options: "i" }; 
    if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) }; 
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) }; 

    const sortOptions = {};
    if (sortBy) {
      const [field, order] = sortBy.split(":"); 
      sortOptions[field] = order === "desc" ? -1 : 1;
    }
    const packages = await TourPackage.find(query).sort(sortOptions);
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};


exports.getallbook = async (req, res) => {
  try {
    const packages = await Booking.find();
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch packages" });
  }
}