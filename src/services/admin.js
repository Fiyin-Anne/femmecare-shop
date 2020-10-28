import Product from "../models/product";
import User from "../models/user";
import Category from "../models/category";

export default class Admin {
    static async addProduct(product) {
        try {
        return await new Product(product).save();
        } catch (err) {
        throw err;
        }
    }
  
    static async addCategory(category) {
        try {
        return await new Category(category).save();
        } catch (err) {
        throw err;
        }
    }

    static async checkRole(email) {
        try {
          return await User.findOne({ email, role: "Admin" })
        } catch (error) {
          throw error;
        }
      }
}
