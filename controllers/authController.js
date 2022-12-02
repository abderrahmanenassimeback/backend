const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  console.log(req.body);

  // console.Console(user);
  try {
    const { name, email, passportNumber, password, userType } = req.body;
    const hashed = bcrypt.hashSync(password, 8);
    const userModel = new User({
      name: name,
      email: email,
      password: hashed,
      passportNumber: passportNumber,
      userType: userType,
    });
    const createdUser = await userModel.save();

    res.json({ data: createdUser, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
