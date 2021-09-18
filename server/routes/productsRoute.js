const upload = require("../middlewares/multer");
const router = require("express").Router();
const productsController = require("../controllers/productsController");
const authMiddleWare = require("../middlewares/authMiddleware");

router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getProductById);
router.get("/filter/:gender", productsController.getProductByGender);

// router.use(authMiddleWare);

router.put("/:id", productsController.updateProduct);
router.post("/", upload.array("images", 5), productsController.createProduct);
router.delete("/:id", productsController.deleteProduct);

module.exports = router;
