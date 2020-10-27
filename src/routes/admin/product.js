import express from "express";
import ProductController from "../../controllers/product";

const { addProduct, getProducts, getProductById } = ProductController;
const router = express.Router();

router.get("/products", getProducts);
router.get("/product/:id", getProductById);
router.post("/product", addProduct);
router.put("/product/:id");
router.delete("/product/:id");



module.exports = router;