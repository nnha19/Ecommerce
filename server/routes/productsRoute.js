const router = require("express").Router();
const productsController = require("../controllers/productsController");
const authMiddleWare = require("../middlewares/authMiddleware");

router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getProductById);
router.get("/filter/:gender", productsController.getProductByGender);

router.use(authMiddleWare);

router.put("/:id", productsController.updateProduct);
router.post("/", productsController.createProduct);
router.delete("/:id", productsController.deleteProduct);

module.exports = router;
