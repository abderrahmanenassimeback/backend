const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/users/:id/history-requests", userController.getUserHisteryContest);

module.exports = router;