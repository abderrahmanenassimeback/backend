const express = require("express");
const contestController = require("../controllers/contestController");
const admin = require("../middleWare/adminPermission");

const router = express.Router();

router.post("/contests", admin,contestController.createContest);
router.get("/contests", contestController.getContestList);
router.get("/contests/:id", contestController.getContestById);

module.exports = router;