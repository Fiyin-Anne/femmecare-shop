import express from "express";
import Authentication from "../../middlewares/authentication";
import UserController from "../../controllers/user";
import ProductController from "../../controllers/product";

const { verifyToken } = Authentication;
const { getProducts } = ProductController;
const { addUser, userLogin } = UserController;
const router = express.Router();

router.post("/register", addUser);
router.post("/signin", userLogin);
router.get("/products", getProducts);
router.get("/categories", (req, res) => {
    res.status(200).send("Products!!!!")});


module.exports = router;