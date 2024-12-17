const express = require("express");
const tourControllers = require("../controllers/tourcontrollers");

const app = express();
const router = express.Router();


router.get("/packages", tourControllers.getAllPackages);
router.get("/packages/:id", tourControllers.getPackageById);


module.exports = router;