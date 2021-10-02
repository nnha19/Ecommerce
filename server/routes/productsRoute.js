const upload = require("../middlewares/multer");
const router = require("express").Router();
const productsController = require("../controllers/productsController");
const authMiddleWare = require("../middlewares/authMiddleware");

router.get("/", productsController.getAllProducts);
router.get("/random/:count", productsController.getRandomProducts);
router.get("/:id", productsController.getProductById);
router.post("/filter", productsController.getProductsByFilterValue);

router.use(authMiddleWare);

router.put("/:id", upload.array("images", 5), productsController.updateProduct);
router.post("/", upload.array("images", 5), productsController.createProduct);
router.delete("/:id", productsController.deleteProduct);

module.exports = router;
