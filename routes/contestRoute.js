const express = require("express");
const contestController = require("../controllers/contestController");
const admin = require("../middleWare/adminPermission");

const router = express.Router();

router.post("/contests", admin,contestController.createContest);
router.get("/contests", contestController.getContestList);
router.get("/contests/get-active-contest-requests", contestController.getActiveContest);
router.get("/contests/:id", contestController.getContestById);
router.post("/contests/:id/main-pize-requests", contestController.chooseMainPrize);


module.exports = router;