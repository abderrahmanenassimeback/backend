const mongoose = require("mongoose");

const PriceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  winningChance: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("prices", PriceSchema);
