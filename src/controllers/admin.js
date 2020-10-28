import bcrypt from "bcrypt";
import AdminServices from "../services/admin";
import UserServices from "../services/user";
import jwtHelper from "../utilities/jwt"
import {loginValidation} from "../validations/user";

export default class AdminController {
    static async adminLogin (req, res) {
        try {
            const { error } = loginValidation(req.body);
            if (error) {
                return res.status(400).json({ status: 400, message: "Validation Error", error: error.message, });
            }      
            const { email, password } = req.body;
            const Email = email.toLowerCase();
            const user = await UserServices.checkEmail(Email);
            if (!user) return res.status(409).json({ status: 409, error: "Email does not exist." });
            const checkRole = await AdminServices.checkRole(Email);
            if (!checkRole) return res.status(403).json({ status: 403, error: "Access Denied." });
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return res.status(404).json({ status: 400, error: "Incorrect password!" });
            const token = await jwtHelper.generateToken({ user });
            return res.status(200).json({ status: 200, message: `Hello ${user.username}, welcome!`, token: token});
            } catch (error) {
                res.status(500).json({ status: 500, error: "Server Error" });
            }
    }
}