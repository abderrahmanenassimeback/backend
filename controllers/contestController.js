const constestService = require("../services/contestService");

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
    const createContest = await constestService.createContest(
      name,
      startDate,
      endDate,
      ticketNumbers,
      chooseprices,
      mainPrice,
      status
    );
    res.status(201).json({ data: createContest });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

exports.getContestList = async (req, res) => {
  try {
    const contestList = await constestService.getContestList();
    res.status(200).json(contestList);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

//retrieve a specific contest
exports.getContestById = async (req, res) => {
  try {
    const contestId = req.params.id;
    const contest = await constestService.getContestById(contestId);
    res.status(200).json(contest);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
