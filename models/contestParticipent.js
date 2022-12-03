const mongoose = require("mongoose");

const ContestParticipentSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  ticketId: {
    type:String,
    required: true,
  },
  contestId: {
    type: String,
    required: true,
  },
  prize: {
    type: String,
    default:""
  },
  prizeStatus: {
    type: String,
    default:""
  },
  mainPrizeResult: {
    type: String,
    default:"Loose"
  },      
},{ timestamps: true });

module.exports = mongoose.model("contestParticipents", ContestParticipentSchema);
