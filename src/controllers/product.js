import Admin from "../services/admin";
import ProductServices from "../services/product";

export default class ProductController {
    static async addProduct(req, res) {
        try {
            const { name, price, categoryId, description } = req.body;
            const product = { name, price, categoryId, description};
            const checkProduct = await ProductServices.checkProduct(name);
            if (checkProduct) return res.status(409).json({message: 'This product already exists.'});
            const newProduct = await Admin.addProduct(product);
            return res.status(201).json({ status: 201, message: "Product added!", data: newProduct, });
        } catch (error) {
            res.status(500).json({ status: 500, error: "Server Error" });
        }
    }

    static async getProducts(req, res) {
        try {
            const products = await ProductServices.getProducts();
            res.status(200).json({ status: 200, products: products, })
        } catch (error) {
            res.status(500).json({ status: 500, error: "Server Error" });
        }
    }

    static async getProductById(req, res) {
        try {
            console.log(req.params)
            const { id } = req.params;
            const product = await ProductServices.getProductById(id);
            res.status(200).json({ status: 200, product: product, })
        } catch (error) {
            res.status(500).json({ status: 500, error: "Server Error" });
        }
    }
}