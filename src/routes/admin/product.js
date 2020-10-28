import express from "express";
import ProductController from "../../controllers/product";
import Authentication from "../../middlewares/authentication";

const { verifyToken, verifyAdmin } = Authentication;
const { addProduct, getProducts, getProduct, deleteProduct, updateProduct } = ProductController;
const router = express.Router();

router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.post("/product", verifyToken, verifyAdmin, addProduct);
router.put("/product/:id", verifyToken, verifyAdmin, updateProduct);
router.delete("/product/:id", verifyToken, verifyAdmin, deleteProduct);



module.exports = router;