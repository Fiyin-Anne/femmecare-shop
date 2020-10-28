import express from "express";
import AdminController from "../../controllers/admin";

const { adminLogin } = AdminController;
const router = express.Router();

router.post("/signin", adminLogin);

module.exports = router;