const tourModel = require("../models/tourModel");


exports.getAllPackages = async (req, res) => {
  try {
    const packages = await tourModel.find();
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch packages" });
  }
};


exports.getPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Looking for package with ID: ${id}`);  

    const tourpackage = await tourModel.findById(id);

    if (!tourpackage) {
      return res.status(404).json({ error: "Package not found" });
    }
    res.status(200).json(tourpackage);
  } catch (err) {
    console.log("err : ", err);
    res.status(500).json({ error: "Failed to fetch package details" });
  }
};
