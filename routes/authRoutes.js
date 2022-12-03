const express = require("express");
const authController = require("../controllers/authController");
const auth = require("../middleWare/requireAuth");
const admin = require("../middleWare/adminPermission");
const employee = require("../middleWare/employeePermission");
const passport = require("passport");

const router = express.Router();

router.post("/sign-up", authController.createUser);

router.post("/sign-in", authController.signIn);

router.post("/add-user", admin, authController.addEmplyoee);

router.get("/google/login/success", authController.sucessGoogleLogin);

router.get("/google/login/failed", authController.failGoogleLogin);

router.get(
  "/google/login",
  passport.authenticate("google", ["profile", "email"])
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/signup",
    failureRedirect: "/google/login/failed",
  })
);

router.get("/logout", authController.logout);

module.exports = router;
