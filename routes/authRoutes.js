const express = require("express");
const authController = require("../controllers/authController");
const auth = require("../middleWare/requireAuth");
const admin = require("../middleWare/adminPermission");
const employee = require("../middleWare/employeePermission");

const router = express.Router();

router.post("/sign-up", authController.createUser);

router.post("/sign-in", authController.signIn);

router.post("/add-user", admin, authController.addEmplyoee);

module.exports = router;
