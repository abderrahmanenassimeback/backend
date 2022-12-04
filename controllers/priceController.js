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

      const prices = {
        id: "",
        name: "",
        winningChance: "",
        checked:0
      };
        const priceList = await Price.find();

        let userArray = [];

        for (const element of priceList) {
          
          if (priceList.length > 0) {
            prices.id = element._id.toString();
            prices.name = element.name;
            prices.winningChance = element.winningChance;
            prices.checked = 0;
        
            userArray.push(prices);
          }
        }
    
        res.status(200).json(userArray);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
};
