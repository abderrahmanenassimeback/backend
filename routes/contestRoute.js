const express = require("express");
const contestController = require("../controllers/contestController");

const router = express.Router();

router.post("/contests", contestController.createContest);
router.get("/contests", contestController.getContestList);
router.get("/contests/:id", contestController.getContestById);

module.exports = router;