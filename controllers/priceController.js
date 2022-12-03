const Price = require("../models/Price");

exports.addPrice = async (req, res) => {
  try {
    const { name, winningChance } = req.body;
    const priceModel = new Price({
      name: name,
      winningChance: winningChance,
    });
    const addPrice = await priceModel.save();

    res.status(201).json({ data: addPrice});
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

exports.getPriceList = async (req, res) => {
    try {
        const priceList = await Price.find();
        res.status(200).json(priceList);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
};
