import express from "express";
import UserController from "../../controllers/user";

const { addUser, userLogin } = UserController;
const router = express.Router();

router.post("/register", addUser);
router.post("/signin", userLogin);


module.exports = router;