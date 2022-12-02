const Contest = require("../models/Contest");

exports.createContest = async (req, res) => {
  try {
    const { name, startDate,endDate,ticketNumbers,chooseprices,mainPrice,status } = req.body;
    const contestModel = new Price({
      name: name,
      startDate: startDate,
      endDate:endDate,
      ticketNumbers:ticketNumbers,
      chooseprices:chooseprices,
      mainPrice:mainPrice,
      status:status
    });
    const createContest = await contestModel.save();

    res.json({ data: createContest, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


