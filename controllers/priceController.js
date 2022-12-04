const priceService = require("../services/priceService");

exports.addPrice = async (req, res) => {
  try {
    const { name, winningChance } = req.body;
    const addPrice = await priceService.addPrice(name, winningChance);
    res.status(201).json({ data: addPrice });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

exports.getPriceList = async (req, res) => {
  try {
     const priceList = await priceService.getPriceList();
    res.status(200).json(priceList);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};
