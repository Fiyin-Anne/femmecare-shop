import Cart from "../models/cart";

export default class CartServices {
    // 
    static async checkCategory(categoryName) {
      try {
        return await Category.findOne({ name: categoryName });
      } catch (err) {
        throw err;
      }
    }

    static async getCategories() {
      try {
        return await Category.find({});
      } catch (err) {
        throw err;
      }
    }

    static async getCategory(id) {
      try {
        return await Category.findById(id)
      } catch (err) {
        throw err;
      }
    }

    static async deleteCategory(id) {
      try {
        return await Category.findByIdAndDelete(id)
      } catch (err) {
        throw err;
      }
    }
    
    static async updateCategory(id, body, options) {
      try {
        return await Category.findByIdAndUpdate(id, body, options )
      } catch (err) {
        throw err;
      }
    }
}