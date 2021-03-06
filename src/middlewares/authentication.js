import jwt from "jsonwebtoken";
import User from "../models/user";

export default class Authentication {
  
    static async verifyToken(req, res, next) {
      try {
        const { authorization } = req.headers;
        let decoded;
        if (authorization) {
          const token = authorization.split(" ")[1];
          decoded = jwt.verify(token, process.env.JWT_KEY);
          req.decoded = decoded;
          return next();
        }
        return res.status(401).json({ status: 401, error: "Please login." });
      } catch (error) {
        return res.status(500).json({ status: 500, error: "Server Error." });
      }
    }

  static async verifyAdmin(req, res, next) {
    try {
      const { _id } = req.decoded.user;
      const user = await Authentication.findAdminById(_id);
      if (user) {
        return next();
      }
      return res.status(403).json({ status: 403, error: "Access denied." });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server Error." });
    }
  }

  static async findAdminById(_id) {
    try {
      return await User.findOne({ _id, role: "Admin" })
    } catch (error) {
      throw error;
    }
  }
}
