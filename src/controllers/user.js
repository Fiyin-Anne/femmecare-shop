import bcrypt from "bcrypt";
import UserServices from "../services/user";
import jwtHelper from "../utilities/jwt"
import {registerValidation, loginValidation} from "../validations/user"
export default class UserController {
    static async addUser(req, res) {
        try {
            const { error } = registerValidation(req.body);
            if (error) {
                return res.status(400).json({ status: 400, message: "Validation Error", error: error.message, });
            }
            const { username, email, password } = req.body;
            const Email = email.toLowerCase();
            const Username = username.toLowerCase();            
            const existingEmail = await UserServices.checkEmail(Email);
            if (existingEmail) return res.status(409).json({ status: 409, error: "Email already used by another user." });
            const existingUsername = await UserServices.checkUser(Username);
            if (existingUsername) return res.status(409).json({ status: 409, error: `Sorry, ${username} is not available.` });
            const hashPassword = await bcrypt.hash(password, 10);
            const user = { username: Username, email: Email, password: hashPassword, verify_password: hashPassword };
            const newUser = await UserServices.addUser(user);
            return res.status(201).json({ status: 201, message: `Registration successful. Hello, ${newUser.username}!`, });
        } catch (error) {
            res.status(500).json({ status: 500, error: "Server Error" });
        }
    }

    static async userLogin (req, res) {
        try {
            const { error } = loginValidation(req.body);
            if (error) {
                return res.status(400).json({ status: 400, message: "Validation Error", error: error.message, });
            }      
            const { email, password } = req.body;
            const Email = email.toLowerCase();
            const user = await UserServices.checkEmail(Email);
            if (!user) return res.status(409).json({ status: 409, error: "Email does not exist." });
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return res.status(404).json({ status: 400, error: "Incorrect password!" });
            const token = await jwtHelper.generateToken({ user });
            return res.status(200).json({ status: 200, message: `Hello ${user.username}, welcome!`, token: token});
            } catch (error) {
                res.status(500).json({ status: 500, error: "Server Error" });
            }
        }
}