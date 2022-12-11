const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
var validator = require("email-validator");
const Contest = require("../models/Contest");

let activeContest = {};

exports.createUser = async (req, res) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  // console.Console(user);
  try {
    const { name, email, passportNumber, password } = req.body;
    if (!(email && passportNumber && name)) {
      res.status(422).send("All input is required");
    } else {
      if (!validator.validate(email)) {
        res.status(422).send("Invalid email");
      } else {
        //validate user
        const user = await User.findOne({ email });

        if (user != null) {
          res.status(422).send("Email already used");
        } else {
          let hashed = "";
          if (password != undefined) {
            hashed = bcrypt.hashSync(password, 8);
          }

          const userModel = new User({
            name: name,
            email: email,
            password: hashed,
            passportNumber: passportNumber,
            userType: "User",
          });
          const createdUser = await userModel.save();

          const token = jwt.sign(
            {
              userId: createdUser._id,
              userType: createdUser.userType,
              email,
              name,
            },
            jwtSecretKey,
            {
              expiresIn: "2h",
            }
          );

          // user
          res.status(200).json({ accessToken: token });
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
      res.status(422).send("All input is required");
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { userId: user._id, userType: user.userType, email, name: user.name },
        jwtSecretKey,
        {
          expiresIn: "2h",
        }
      );
      activeContest = await Contest.find({ status: "Active" });
      dateChecker(activeContest);

      // user
      res.status(200).json({ accessToken: token });
    } else {
      res.status(422).send("Invalid Credentials");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addEmplyoee = async (req, res) => {
  const { authorization } = req.headers;

  // console.Console(user);
  try {
    const { name, email, passportNumber, password } = req.body;
    if (!(email && password)) {
      res.status(422).send("All input is required");
    } else {
      if (!validator.validate(email)) {
        res.status(422).send("Invalid email");
      } else {
        //validate user
        const user = await User.findOne({ email });

        if (user != null) {
          res.status(422).send("Email already used");
        } else {
          const hashed = bcrypt.hashSync(password, 8);
          const userModel = new User({
            name: name,
            email: email,
            password: hashed,
            passportNumber: passportNumber,
            userType: "Employee",
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

exports.sucessGoogleLogin = async (req, res) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let isAlreadySignUp = false;
  let token;
  if (req.user) {
    const user = await User.findOne({ email: req.user._json.email });
    if (user != null) {
      token = jwt.sign(
        {
          userId: user._id,
          userType: user.userType,
          email: user.email,
          name: user.name,
        },
        jwtSecretKey,
        {
          expiresIn: "2h",
        }
      );
      isAlreadySignUp = true;
    }

    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
      isAlreadySignUp: isAlreadySignUp,
      accessToken: token,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
};

exports.failGoogleLogin = async (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
};

exports.logout = async (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
};

exports.checkUserExist = async (req, res) => {
  // console.Console(user);
  try {
    const { email } = req.body;
    if (!email) {
      res.status(422).send("All input is required");
    } else {
      if (!validator.validate(email)) {
        res.status(422).send("Invalid email");
      } else {
        const user = await User.findOne({ email });
        if (user == null) {
          res.status(404).send("Not Found");
        } else {
          user.password = null;
          res.status(200).json(user);
        }
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const dateChecker = async (contest) => {
  let date = new Date();

  let year = date.getFullYear();

  let month = date.getMonth();

  let day = date.getDate();

  let hours = date.getHours();

  let minutes = date.getMinutes();

  let endDate = contest[0].endDate==null ? null : contest[0].endDate;

  let currentDate = new Date(year, month, day, hours, minutes);
 
  let diff = Date.parse(currentDate) - Date.parse(endDate);
  

  if (diff >= 0) {
    await Contest.findOneAndUpdate(
      { status: "Active" },
      { status: "InActive" },
      {
        new: true,
      }
    );
  } else {
    console.log("Not yet");
  }
};
