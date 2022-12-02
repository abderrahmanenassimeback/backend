const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/sign-up", authController.createUser);

router.post("/sign-in", authController.signIn);

module.exports = router;
