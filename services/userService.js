const User = require("../models/User");
const ContestParticipent = require("../models/contestParticipent");
const mongoose = require("mongoose");
const Contest = require("../models/Contest");

exports.getUsersList = async () => {
  try {
    const usereList = await User.find();
    return usereList;
  } catch (err) {
    throw err;
  }
};

exports.getUserHisteryContest = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: "No such User" });
    }

    const contestUserHistery = {
      userId: "",
      ticketId: "",
      contestId: "",
      contestName: "",
      contestStartDate: "",
      contestEndDate: "",
      contestStatus: "",
      prize: "",
      prizeStatus: "",
      mainPrizeResult: "",
    };

    const contestParticipent = await ContestParticipent.find({ userId: id });
    let userHisteryArray = [];

    for (const element of contestParticipent) {
      let userId = element.userId;
      const contest = await Contest.find({ _id: element.contestId });

      if (contest.length > 0) {
        contestUserHistery.userId = userId;
        contestUserHistery.ticketId = element.ticketId;
        contestUserHistery.contestId = element.contestId;
        contestUserHistery.contestName = contest.at(0).name;
        contestUserHistery.contestStartDate = contest.at(0).startDate;
        contestUserHistery.contestEndDate = contest.at(0).endDate;
        contestUserHistery.contestStatus = contest.at(0).status;
        contestUserHistery.prize = element.prize;
        contestUserHistery.prizeStatus = element.prizeStatus;
        contestUserHistery.mainPrizeResult = element.mainPrizeResult;

        userHisteryArray.push(contestUserHistery);
      }
    }
    return contestUserHistery;
  } catch (err) {
    throw err;
  }
};

exports.updateUserProfile = async (id, name) => {
  try {
    const filter = { _id: id };
    const update = { name: name };

    let updateUser = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    return updateUser;
  } catch (err) {
    throw err;
  }
};
