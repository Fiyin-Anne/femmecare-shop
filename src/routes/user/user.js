import express from "express";
import UserController from "../../controllers/user";
import CategoryController from "../../controllers/category";
import ProductController from "../../controllers/product";
import Authentication from "../../middlewares/authentication";

const { addUser, userLogin } = UserController;
const router = express.Router();
const { getProducts, getProduct, } = ProductController;
const {  getCategories, getCategory, } = CategoryController;

router.post("/register", addUser);
router.post("/signin", userLogin);
router.get("/categories", getCategories);
router.get("/category/:id", getCategory);
router.get("/products", getProducts);
router.get("/product/:id", getProduct);

module.exports = router;