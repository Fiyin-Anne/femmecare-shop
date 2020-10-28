import express from "express";
import Authentication from "../../middlewares/authentication";
import CartController from "../../controllers/cart";

const {addToCart, getCart, deleteCart } = CartController;
const { verifyToken } = Authentication;
const router = express.Router();

router.post("/add", verifyToken, addToCart);
router.delete("/", verifyToken, deleteCart);
router.get("/", verifyToken, getCart);


module.exports = router;