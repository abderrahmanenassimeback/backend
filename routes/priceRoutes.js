const express = require("express");
const priceController = require("../controllers/priceController");
const admin = require("../middleWare/adminPermission");

const router = express.Router();

router.post("/prices",admin,priceController.addPrice);
router.get("/prices",priceController.getPriceList);

module.exports = router;