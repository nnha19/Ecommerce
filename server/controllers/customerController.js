const Customer = require("../Modals/Customer");

const createCustomer = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existCustomer = await Customer.findOne({ email });
    if (existCustomer) {
      res.status(400).json("User with this email already exists.");
    } else {
      const newCustomer = await Customer.create({
        username,
        email,
        password,
      });
      res.status(200).json("Account successfully created.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.createCustomer = createCustomer;
