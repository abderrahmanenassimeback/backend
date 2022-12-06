const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ContestParticipent = require("../models/contestParticipent");
const mongoose = require("mongoose");
const Contest = require("../models/Contest");
const contestParticipent = require("../models/contestParticipent");

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
      throw new Error("No such User");
    }

    const contestParticipent = await ContestParticipent.find({ userId: id });
    let userHisteryArray = [];

    for (const element of contestParticipent) {
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

    return userHisteryArray;
  } catch (err) {
    throw err;
  }
};

exports.getUserById = async (id) => {

  try {
    console.log('serviceid :',id)
    const user = await User.findOne({ _id: id });
    console.log('database: ',user)
    return user;
  } catch (err) {
    throw err;
  }
};

exports.updateUserProfile = async (id, name, email) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  try {
    const filter = { _id: id };
    const update = { name: name, email: email };

    let updateUser = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
      const token = jwt.sign(
      {
        userId: updateUser._id,
        userType: updateUser.userType,
        email: updateUser.email,
        name: updateUser.name,
      },
      jwtSecretKey,
      {
        expiresIn: "2h",
      }
    );
    console.log(token)
    return token;
  } catch (err) {
    throw err;
  }
};

exports.deleteUserProfile = async (id) => {
  try {
    const user = await User.findOneAndDelete({ _id: id });
  //   console.log(user);
  //   if (!user) {
  //     console.log("HIiii")
  //    // throw new Error("No such User");
  //   } else {
  //     const contestsP = await ContestParticipent.find({ _id: id });
  //     for (const element of contestsP) {
  //       let userId = element.userId;
  //       await contestParticipent.deleteOne({ userId: userId });
  //     }
  //  }
   return user;
  } catch (err) {
    throw err;
  }
};
