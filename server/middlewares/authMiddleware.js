const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(`token is ${token}`);
    if (!token) {
      console.log("Hello");
      res.status(400).json("You are not authorized");
    }
    checkToken = jwt.verify(token, "Secret_Key");
    req.userId = checkToken.userId;
    req.admin = checkToken.admin;
    next();
  } catch (err) {
    console.log("error");
    console.log(err);
  }
};

module.exports = authMiddleWare;
