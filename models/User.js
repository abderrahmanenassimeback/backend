const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passportNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  userType: {
    type: String,
    required: true,
  },
},{ timestamps: true });

module.exports = mongoose.model("users", UserSchema);
