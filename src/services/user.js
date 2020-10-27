import User from "../models/user";

export default class UserServices {
    static async checkUser(username) {
      try {
        return await User.findOne({ username });
      } catch (err) {
        throw err;
      }
    }

    static async checkEmail(email) {
        try {
          return await User.findOne({ email });
        } catch (err) {
          throw err;
        }
      }

    static async addUser(user) {
        try {
          return await new User(user).save();
        } catch (err) {
          throw err;
        }
      }
}