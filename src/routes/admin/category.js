import express from "express";
import CategoryController from "../../controllers/category";
import Authentication from "../../middlewares/authentication";

const { verifyToken, verifyAdmin } = Authentication;
const { addCategory, getCategories, getCategory, deleteCategory, updateCategory } = CategoryController;
const router = express.Router();

router.get("/categories", getCategories);
router.get("/category/:id", getCategory);
router.post("/category", verifyToken, verifyAdmin ,addCategory);
router.put("/category/:id", verifyToken, verifyAdmin ,updateCategory);
router.delete("/category/:id", verifyToken, verifyAdmin ,deleteCategory);



module.exports = router;