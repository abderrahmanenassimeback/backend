const mongoose = require('mongoose');
const UserType = require("./model/UserType");

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
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: UserType,
    required: true,
  },
});