import bcrypt from "bcrypt";
import UserServices from "../services/user";
import jwtHelper from "../utilities/jwt"

export default class UserController {
    static async addUser(req, res) {
        try {
            const { username, email, password, role } = req.body;
            const Email = email.toLowerCase();
            const Username = username.toLowerCase();            
            // const existingEmail = await UserServices.checkEmail(Email);
            // if (existingEmail) return res.status(409).json({ status: 409, error: "Email already used by another user." });
            const existingUsername = await UserServices.checkUser(Username);
            if (existingUsername) return res.status(409).json({ status: 409, error: `Sorry, ${username} is not available. Please pick another username` });
            const hashPassword = await bcrypt.hash(password, 10);
            const user = { username: Username, email: Email, password: hashPassword, role };
            const newUser = await UserServices.addUser(user);
            return res.status(201).json({ status: 201, message: "User added!", data: newUser, });
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: 500, error: "Server Error" });
        }
    }

    static async userLogin (req, res) {
        try {
            const { email, password } = req.body;
            const Email = email.toLowerCase();
            const user = await UserServices.checkEmail(Email);
            if (!user) return res.status(409).json({ status: 409, error: "Email does not exist." });
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return res.status(404).json({ status: 400, error: "Incorrect password!." });
            const token = await jwtHelper.generateToken({ user });
            return res.status(200).json({ status: 200, message: `Hello ${user.username}, welcome!`, });
            } catch (error) {
                res.status(500).json({ status: 500, error: "Server Error" });
            }
        }
}