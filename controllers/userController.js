const jwt = require("jsonwebtoken");
const userService = require("../services/userService");
const mongoose = require("mongoose");
const contestParticipent = require("../models/contestParticipent");

exports.getUserHisteryContest = async (req, res) => {
  try {
    const id = req.params.id;
    const userHisteryArray = await userService.getUserHisteryContest(id);
    res.status(200).json(userHisteryArray);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.getUsersList = async (req, res) => {
  try {
    const usereList = await userService.getUsersList();
    res.status(200).json(usereList);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const { name,email } = req.body;
    let token = await userService.updateUserProfile(id, name,email);

    res.status(200).json({ accessToken: token });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

exports.deleteUserProfile = async (req, res) => {
  try {
    const id = req.params.id;
    userService.deleteUserProfile(id);
    res.status(204).send("success");
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

exports.updateUserPrizeStatus = async (req, res) => {
  try {
    const { userId,ticketId,contestId,prize } = req.body;
     const constUserPrize =await userService.updateUserPrizeStatus(userId, ticketId,contestId,prize);

     if (constUserPrize != null) {
      res.status(200).json(constUserPrize);
     }else{
      res.status(422).json({message:"Change Status failure"});
     }
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};