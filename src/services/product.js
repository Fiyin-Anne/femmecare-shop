import Product from "../models/product";

export default class ProductServices {
  static async countProduct() {
    try {
      return await Product.countDocuments();
    } catch (err) {
      throw err;
    }
  }
    static async checkProduct(productName) {
      try {
        return await Product.findOne({ name: productName });
      } catch (err) {
        throw err;
      }
    }

    static async getProducts() {
      try {
        return await Product.find();
      } catch (err) {
        throw err;
      }
    }

    static async getProductsByPage(page, limit) {
      try {
        return await Product.find({})
        .limit(limit * 1)
        .skip((page - 1) * limit);
      } catch (err) {
        throw err;
      }
    }

    static async getProductById(id) {
      try {
        return await Product.findById(id)
      } catch (err) {
        throw err;
      }
    }

    static async deleteProductById(id) {
      try {
        return await Product.findByIdAndDelete(id)
      } catch (err) {
        throw err;
      }
    }
    
    static async updateProductById(id, body, options) {
      try {
        return await Product.findByIdAndUpdate(id, body, options )
      } catch (err) {
        throw err;
      }
    }
}