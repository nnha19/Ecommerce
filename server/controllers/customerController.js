const Customer = require("../Modals/Customer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createCustomer = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existCustomer = await Customer.findOne({ email });
    if (existCustomer) {
      res.status(400).json("User with this email already exists.");
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      const newCustomer = await Customer.create({
        username,
        email,
        password: hashedPassword,
      });
      const token = await jwt.sign(
        { userId: newCustomer._id, username },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: "Account successfully created",
        token,
        user: { username: newCustomer.username, userId: newCustomer._id },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const loginCustomer = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email });
    if (!customer) {
      res.status(400).json("User with the provided email doesn't exist");
    } else {
      const validPassword = await bcrypt.compare(password, customer.password);
      if (validPassword) {
        const token = jwt.sign(
          {
            userId: customer._id,
            username: customer.username,
            admin: customer.admin,
          },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({
          message: "Logged you in",
          token,
          user: {
            username: customer.username,
            userId: customer._id,
            admin: customer.admin,
          },
        });
      } else {
        res.status(400).json("Incorrect password.");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.createCustomer = createCustomer;
exports.loginCustomer = loginCustomer;
