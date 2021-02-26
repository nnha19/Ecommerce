const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
  console.log("auth middleware.");
  try {
    const token = req.headers.authorization;
    if (!token) {
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
