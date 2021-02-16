const router = require("express").Router();
const customerController = require("../controllers/customerController");

router.post("/", customerController.createCustomer);
router.post("/login", customerController.loginCustomer);

module.exports = router;
