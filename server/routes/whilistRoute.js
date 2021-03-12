const router = require("express").Router({ mergeParams: true });
const whilistController = require("../controllers/whilistController");

router.get("/", whilistController.getWhilistByUserId);
router.post("/:productId", whilistController.createWhilist);
router.delete("/:productId", whilistController.deleteOneWhilist);
router.delete("/", whilistController.deleteAllWhilist);

module.exports = router;
