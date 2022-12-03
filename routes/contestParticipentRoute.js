const express = require("express");
const contestParticipentController = require("../controllers/contestParticipentController");

const router = express.Router();

router.post("/contest-participents/ticket-validatation-requests", contestParticipentController.ticketValidationAndSave);
router.get("/contest-participents", contestParticipentController.getContestParticipentsList);
// router.get("/contests/:id", contestController.getContestById);

module.exports = router;