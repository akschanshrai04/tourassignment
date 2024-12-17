const express = require("express");
const bookingControllers = require("../controllers/bookingcontrollers");

const app = express();

const router = express.Router();


router.post("/bookings", bookingControllers.createBooking);
router.get("/getbooking/:id" , bookingControllers.getbookbyid);
module.exports = router;