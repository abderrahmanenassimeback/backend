const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
var validator = require("email-validator");

exports.createUser = async (req, res) => {
  // console.Console(user);
  try {
    const { name, email, passportNumber, password, userType } = req.body;
    if (!(email && password && userType)) {
      res.status(400).send("All input is required");
    } else {
      if (!validator.validate(email)) {
        res.status(400).send("Invalid email");
      } else {
        //validate user
        const user = await User.findOne({ email });

        if (user != null) {
          res.status(400).send("Email already used");
        } else {
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
        }
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.signIn = async (req, res) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  // console.Console(user);
  try {
    const { email, password } = req.body;
    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { userId: user._id, userType: user.userType, email },
        jwtSecretKey,
        {
          expiresIn: "2h",
        }
      );

      // user
      res.status(200).json({ accessToken: token });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
