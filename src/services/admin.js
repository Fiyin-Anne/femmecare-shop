import Product from "../models/product";
import Category from "../models/category";

export default class Admin {
    static async addProduct(product) {
        try {
        return await new Product(product).save();
        } catch (err) {
        throw err;
        }
    }

    static async addCategory(product) {
        try {
        return await new Category(product).save();
        } catch (err) {
        throw err;
        }
    }
}
