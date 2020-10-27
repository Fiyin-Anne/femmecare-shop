import express from "express";
import Authentication from "../../middlewares/authentication";

const { verifyToken } = Authentication;
const router = express.Router();

router.post("/add", verifyToken);
router.post("/remove", verifyToken);
router.post("/checkout", verifyToken);
router.get("/");


module.exports = router;