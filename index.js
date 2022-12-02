const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

// const { encrypt, decrypt } = require("./EncryptionHandler");
const apiUrl="/api/v1";

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const auth = require("./routes/authRoutes");
app.use(`${apiUrl}/auth`, auth);

// manage price
const price = require("./routes/priceRoutes");
app.use(`${apiUrl}`,price);

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

app.listen(3001, () => {
  console.log("Sever start on port 3001");
});
