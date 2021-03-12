const Whilist = require("../Modals/Whilist");
const Customer = require("../Modals/Customer");

const getWhilistByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  Customer.findById(userId)
    .populate("whilist")
    .exec((err, customer) => {
      if (err) {
        res.status(400).json(err);
      } else {
        if (!customer) {
          res.status(400).json("User with the provided id doesn't exist.");
        } else {
          console.log(customer);
          res.status(200).json(customer.whilist);
        }
      }
    });
};

const createWhilist = async (req, res, next) => {
  try {
    const { uid, productId } = req.params;
    const customer = await Customer.findById(uid);
    customer.whilist.push(productId);
    await customer.save();
    console.log(customer);
    res.status(200).json(customer.whilist);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getWhilistByUserId = getWhilistByUserId;
exports.createWhilist = createWhilist;
