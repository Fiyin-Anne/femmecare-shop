import express from "express";
import CategoryController from "../../controllers/category";
import Authentication from "../../middlewares/authentication";

const { verifyToken } = Authentication;
const { addCategory, getCategories, getCategory, deleteCategory, updateCategory } = CategoryController;
const router = express.Router();

router.get("/categories", getCategories);
router.get("/category/:id", getCategory);
router.post("/category", verifyToken, addCategory);
router.put("/category/:id", verifyToken, updateCategory);
router.delete("/category/:id", verifyToken, deleteCategory);



module.exports = router;