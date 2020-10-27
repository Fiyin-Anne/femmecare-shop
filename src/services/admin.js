import Product from "../models/product";

export default class Admin {
    static async addProduct(product) {
        try {
        return await new Product(product).save();
        } catch (err) {
        throw err;
        }
    }
}
