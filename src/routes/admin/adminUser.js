import express from "express";
import AdminController from "../../controllers/admin";
import CategoryController from "../../controllers/category";
import Authentication from "../../middlewares/authentication";
import ProductController from "../../controllers/product";

const router = express.Router();

const { adminLogin } = AdminController;
const { verifyToken, verifyAdmin } = Authentication;
const { addProduct, getProducts, getProduct, deleteProduct, updateProduct } = ProductController;
const { addCategory, getCategories, getCategory, deleteCategory, updateCategory } = CategoryController;

router.post("/signin", adminLogin);
router.get("/categories", getCategories);
router.get("/category/:id", getCategory);
router.post("/category", verifyToken, verifyAdmin ,addCategory);
router.put("/category/:id", verifyToken, verifyAdmin ,updateCategory);
router.delete("/category/:id", verifyToken, verifyAdmin ,deleteCategory);

router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.post("/product", verifyToken, verifyAdmin, addProduct);
router.put("/product/:id", verifyToken, verifyAdmin, updateProduct);
router.delete("/product/:id", verifyToken, verifyAdmin, deleteProduct);



module.exports = router;