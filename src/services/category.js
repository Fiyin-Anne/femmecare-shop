import Category from "../models/category";

export default class CategoryServices {

    static async countCategory() {
      try {
        return await Category.countDocuments();
      } catch (err) {
        throw err;
      }
    }

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
    
    static async getCategoriesByPage(page, limit) {
      try {
        return await Category.find({})
        .limit(limit * 1)
        .skip((page - 1) * limit);
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