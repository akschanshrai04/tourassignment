const express = require("express");
const adminControllers = require("../controllers/admincontrollers");
const adminAuth = require("../middleware/adminAuth");

const app = express();
const router = express.Router();


router.post("/admin/packages", adminAuth , adminControllers.addPackage);
router.put("/admin/packages/:id", adminAuth , adminControllers.updatePackage)
router.delete("/admin/packages/:id", adminAuth , adminControllers.deletePackage)
router.get("/admin/allpackages", adminAuth , adminControllers.getAllBookings);
router.get("/admin/bookings", adminAuth , adminControllers.getallbook);
module.exports = router;