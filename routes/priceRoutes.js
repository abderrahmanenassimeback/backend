const express = require("express");
const priceController = require("../controllers/priceController");

const router = express.Router();

router.post("/prices", priceController.addPrice);
router.get("/prices", priceController.getPriceList);

module.exports = router;