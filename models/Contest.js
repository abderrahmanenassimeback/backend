const mongoose = require("mongoose");
const status=require("../enum/Status");

const ContestSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type:String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  ticketNumbers: {
    type: Number,
    required: true,
  },
  chooseprices: {
    type: Array,
    required: true,
  },
  mainPrice: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
   
});

module.exports = mongoose.model("contests", ContestSchema);
