import express from "express";

const router = express.Router();

router.get("/categories", (req, res) => {
    res.status(200).send("Categories!!!!")});
router.get("/category/:id");
router.post("/category/:id");
router.put("/category/:id");
router.delete("/category/:id");

module.exports = router;