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
          res.status(200).json(customer.whilist);
        }
      }
    });
};

const createWhilist = async (req, res, next) => {
  try {
    const { uid, productId } = req.params;
    const customer = await Customer.findById(uid);
    const existingWhilist = customer.whilist.filter(
      (whilist) => whilist._id.toString() === productId
    );
    if (existingWhilist.length > 0) {
      const deletedWhilist = customer.whilist.filter(
        (whilist) => whilist._id.toString() !== productId
      );
      customer.whilist = deletedWhilist;
      await customer.save();
      await Customer.findById(uid)
        .populate("whilist")
        .exec((err, customer) => {
          if (err) {
            res.status(400).json(err);
          } else {
            res.status(200).json(customer.whilist);
          }
        });
    } else {
      customer.whilist.push(productId);
      await customer.save();
      Customer.findById(uid)
        .populate("whilist")
        .exec((err, customer) => {
          if (err) {
            res.status(400).json(err);
            console.log(err);
          } else {
            console.log(customer);
            res.status(200).json(customer.whilist);
          }
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const deleteOneWhilist = async (req, res, next) => {
  try {
    const { uid, productId } = req.params;
    const customer = await Customer.findById(uid);
    const deletedWhilist = customer.whilist.filter(
      (whilist) => whilist._id.toString() !== productId
    );
    customer.whilist = deletedWhilist;
    await customer.save();
    res.status(200).json(deletedWhilist);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteAllWhilist = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const customer = await Customer.findById(uid);
    customer.whilist = [];
    await customer.save();
    res.status(200).json("Deleted all whilists");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getWhilistByUserId = getWhilistByUserId;
exports.createWhilist = createWhilist;
exports.deleteOneWhilist = deleteOneWhilist;
exports.deleteAllWhilist = deleteAllWhilist;
