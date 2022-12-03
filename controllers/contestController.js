const Contest = require("../models/Contest");
const Ticket = require("../models/Ticket");
const mongoose = require("mongoose");
const randomBytes = require("randombytes");

exports.createContest = async (req, res) => {
  try {
    const {
      name,
      startDate,
      endDate,
      ticketNumbers,
      chooseprices,
      mainPrice,
      status,
    } = req.body;

    // check contest name previously use or not
    const oldContests = await Contest.find({ name });
    if (oldContests.length > 0) {
      return res.status(422).json({ error: "This name is already used" });
    }

    // check contest status.one time can have a active contest
    const activeContest = await Contest.find({ status: "Active" });
    if (activeContest.length > 0) {
      return res
        .status(422)
        .json({ error: "One contest is already activated" });
    }

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

    for (let i = 0; i < numberOfTickets; i++) {
      const randomString = makeid(10);

      const ticketModel = new Ticket({
        ticketId: randomString,
        contestId: contestId,
      });
      await ticketModel.save();
    }
    res.status(201).json({ data: createContest });
  } catch (err) {
    res.status(422).json({ error: err.message });
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

exports.getContestList = async (req, res) => {
  try {
    const contestList = await Contest.find();
    res.status(200).json({ contestList });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

//retrieve a specific contest
exports.getContestById = async (req, res) => {
  try {
    const contestId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(contestId)) {
      return res.status(404).json({ error: "No such Contest" });
    }

    const contest = await Contest.findById(contestId);

    if (!contest) {
      return res.status(404).json({ error: "No such Contest" });
    }

    res.status(200).json(contest);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
