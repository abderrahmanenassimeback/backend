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
  let priceArray = [];

  for (const element of priceList) {
    let prices = {
      id: "",
      name: "",
      winningChance: "",
      checked: "",
    };

    prices.id = element._id.toString();
    prices.name = element.name;
    prices.winningChance = element.winningChance;
    prices.checked = 0;
    priceArray.push(prices);
  }
  return priceArray;
};
