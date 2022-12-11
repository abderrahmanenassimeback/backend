const mongoose = require("mongoose");

const TicketSchema = mongoose.Schema({
  ticketId: {
    type: String,
    required: true,
  },
  contestId: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    default:true,
  },
});

module.exports = mongoose.model("tickets", TicketSchema);
