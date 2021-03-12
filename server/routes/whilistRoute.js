const router = require("express").Router({ mergeParams: true });
const whilistController = require("../controllers/whilistController");

router.get("/", whilistController.getWhilistByUserId);
router.post("/:productId", whilistController.createWhilist);

module.exports = router;
