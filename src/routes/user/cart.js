import express from "express";
import Authentication from "../../middlewares/authentication";
import CartController from "../../controllers/cart";

const {addToCart } = CartController;
const { verifyToken } = Authentication;
const router = express.Router();

router.post("/add", verifyToken, addToCart);
router.delete("/item/:itemId", verifyToken, );
router.post("/checkout", verifyToken);
router.get("/");


module.exports = router;