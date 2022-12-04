const Price = require("../models/Price");

exports.addPrice = async (name, winningChance) => {
  const priceModel = new Price({
    name: name,
    winningChance: winningChance,
  });
  const addPrice = await priceModel.save();
  return addPrice;
};

exports.getPriceList = async () => {
  const priceList = await Price.find();
  return priceList;
};
