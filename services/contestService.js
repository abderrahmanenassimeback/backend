const { Error } = require("mongoose");
const Contest = require("../models/Contest");
const Ticket = require("../models/Ticket");
const randomBytes = require("randombytes");
const mongoose = require("mongoose");
const contestParticipent = require("../models/contestParticipent");
const User = require("../models/User");

exports.createContest = async (
  name,
  startDate,
  endDate,
  ticketNumbers,
  chooseprices,
  mainPrice,
  status
) => {
  try {
    // check contest name previously use or not
    const oldContests = await Contest.find({ name });
    if (oldContests.length > 0) {
      throw new Error("This name is already used");
      //   return res.status(422).json({ error: "This name is already used" });
    } else {
      // check contest status.one time can have a active contest
      const activeContest = await Contest.find({ status: "Active" });
      if (activeContest.length > 0) {
        throw new Error("One contest is already activated");
        //   return res
        //     .status(422)
        //     .json({ error: "One contest is already activated" });
      } else {
        const contestModel = new Contest({
          name: name,
          startDate: startDate,
          endDate: endDate,
          ticketNumbers: ticketNumbers,
          chooseprices: chooseprices,
          mainPrice: mainPrice,
          status: status,
        });
        const createContest = await contestModel.save();

        //generate tickets
        const numberOfTickets = createContest.ticketNumbers;
        const contestId = createContest._id.toString();

        const allTickets = [];
        for (let i = 0; i < numberOfTickets; i++) {
          const randomString = makeid(10);

          allTickets.push({
            ticketId: randomString,
            contestId: contestId,
          })
          // const ticketModel = new Ticket({
          //   ticketId: randomString,
          //   contestId: contestId,
          // });
          // await ticketModel.save();
        }
        await Ticket.insertMany(allTickets);
        return createContest;
      }
    }
  } catch (err) {
    throw err;
  }
};

function makeid(length) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

exports.getContestList = async () => {
  try {
    const contestList = await Contest.find();
    return contestList;
  } catch (err) {
    throw err;
  }
};

exports.getContestById = async (contestId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(contestId)) {
      throw new Error("No such Contest");
    }

    const contest = await Contest.findById(contestId);

    if (!contest) {
      throw new Error("No such Contest");
    }

    return contest;
  } catch (err) {
    throw err;
  }
};

exports.getActiveContest = async () => {
  try {
    const contest = await Contest.findOne({ status: "Active" });
    if (!contest) {
      throw new Error("No such Contest");
    } else {
      return contest;
    }
  } catch (err) {
    throw err;
  }
};

exports.chooseMainPrize = async (id) => {
  try {
    let participents = await contestParticipent.find({ contestId: id });
    let validParticipents = participents.filter((item) => item.prize != "");
    var winner =
      validParticipents[Math.floor(Math.random() * validParticipents.length)];

    const filter = { _id: winner._id };
    const update = { mainPrizeResult: "won" };

    let updatecontestParticipent = await contestParticipent.findOneAndUpdate(
      filter,
      update,
      {
        new: true,
      }
    );

    const filter1 = { _id: winner.contestId };
    const update1 = { status: "Ended" };

    let updateContest = await Contest.findOneAndUpdate(filter1, update1, {
      new: true,
    });

    console.log("vwinner.userI", winner.userId);

    let user = await User.findOne({ _id: winner.userId });

    console.log(user);

    const data = {
      contestName: updateContest.name,
      mainPrice: updateContest.mainPrice,
      userId: winner.userId,
      // userName: user.name,
      contestId: winner.contestId,
    };
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};
