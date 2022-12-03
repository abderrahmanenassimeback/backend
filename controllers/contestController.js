const Contest = require("../models/Contest");
const mongoose = require("mongoose");

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

    res.status(201).json({ data: createContest });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

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
