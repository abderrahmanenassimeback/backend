const jwt = require("jsonwebtoken");

const admin = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const { userType } = jwt.verify(token, jwtSecretKey);
    if (userType != "Admin") {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = admin;
