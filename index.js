const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const passport = require("passport");

// const { encrypt, decrypt } = require("./EncryptionHandler");
const apiUrl = "/api/v1";

app.use(express.json());
app.use(
  cors({
    origin: "https://dsp-archiwebo21-ss-da-om-en.fr",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);

app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

const auth = require("./routes/authRoutes");
app.use(`${apiUrl}/auth`, auth);

// manage price
const price = require("./routes/priceRoutes");
app.use(`${apiUrl}`, price);

// manage contest
const contest = require("./routes/contestRoute");
app.use(`${apiUrl}`, contest);

// manage contest
const contestParticipent = require("./routes/contestParticipentRoute");
app.use(`${apiUrl}`, contestParticipent);

//manage user
const userRoutes = require("./routes/userRoutes");
app.use(`${apiUrl}`, userRoutes);

//configure mongoose
mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://tiptop:tiptop@cluster0.f8idmlg.mongodb.net/tiptop",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Sever start on port " + port);
});
