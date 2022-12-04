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
        let priceArray = [];

        for (const element of priceList) {

          let prices = {
            id: "",
            name: "",
            winningChance:"" ,
            checked:""
          };

            prices.id = element._id.toString();
            prices.name = element.name;
            prices.winningChance = element.winningChance;
            prices.checked = 0
            priceArray.push(prices);
      
        }
    
        res.status(200).json(priceArray);

    } catch (err) {
        res.status(422).json({ error: err.message });
    }
};
