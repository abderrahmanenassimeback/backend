const Price = require("../models/Price");

exports.addPrice = async (req, res) => {
  try {
    const { name, winningChance } = req.body;
    const priceModel = new Price({
      name: name,
      winningChance: winningChance,
    });
    const addPrice = await priceModel.save();

    res.json({ data: addPrice, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPriceList = async (req, res) => {
    try {
        const priceList = await Price.find();
        res.json({data: priceList});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
