const express = require("express");
const contestController = require("../controllers/contestController");

const router = express.Router();

router.post("/contests", contestController.createContest);

module.exports = router;