const router = require("express").Router();
const customerController = require("../controllers/customerController");

router.post("/", customerController.createCustomer);

module.exports = router;
