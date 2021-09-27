const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(400).json("You are not authorized");
    }
    const checkToken = jwt.verify(token, process.env.JWT_KEY);
    if (checkToken) {
      req.userId = checkToken.userId;
      req.admin = checkToken.admin;
      next();
    } else {
      res.status(400).json("Authorization failed.");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports = authMiddleWare;
