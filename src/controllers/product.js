import Admin from "../services/admin";
import ProductServices from "../services/product";
var ObjectId = require('mongoose').Types.ObjectId;


export default class ProductController {
    static async addProduct(req, res) {
        try {
            const { name, price, category, description } = req.body;
            const product = { name, price, category, description};
            const checkProduct = await ProductServices.checkProduct(name);
            if (checkProduct) return res.status(409).json({message: 'This product already exists.'});
            const newProduct = await Admin.addProduct(product);
            return res.status(201).json({ status: 201, message: `Added ${newProduct.name}!`, data: newProduct});
        } catch (error) {
            res.status(500).json({ status: 500, error: "Server Error" });
        }
    }

    static async getProducts(req, res) {
        try {
            const products = await ProductServices.getProducts();
            if(products.length == 0) return res.status(400).json({ status: 400, message: `Nothing to see here.`, })
            const { page = 1, limit = 5 } = req.query;
            const count = await ProductServices.countProduct();
            const productsPage = await ProductServices.getProductsByPage(page, limit);
            if (productsPage === undefined || productsPage.length == 0) return res.status(400).json({ status: 400, message: `Nothing to see here.`, })
            res.status(200).json({ status: 200, products: productsPage,
                totalPages: Math.ceil(count / limit),
                currentPage: page 
            })
        } catch (error) {
            res.status(500).json({ status: 500, error: "Server Error" });
        }
    }

    static async getProduct(req, res) {
        try {
            const { id } = req.params;
            if (!ObjectId.isValid(id)) return res.status(404).json({
                status: 404,
                error: "Please provide an id",
              });
            const product = await ProductServices.getProductById(id);
            if(!product) return res.status(400).json({ status: 400, message: `This product doesn't exist`, })
            res.status(200).json({ status: 200, product: product, })
        } catch (error) {
            res.status(500).json({ status: 500, error: "Server Error" });
        }
    }

    static async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            if (!ObjectId.isValid(id)) return res.status(404).json({
                status: 404,
                error: "Please provide a valid id.",
              });
            const product = await ProductServices.deleteProductById(id);
            if(!product) return res.status(400).json({
                 status: 400, 
                 message: `This product doesn't exist`, 
                })
            res.status(200).json({ status: 200, message: `${product.name} has been deleted.`, })
        } catch (error) {
            res.status(500).json({ status: 500, error: "Server Error" });
        }
    }

    static async updateProduct(req, res) {
        try {
            const { id } = req.params;
            if (!ObjectId.isValid(id)) return res.status(404).json({
                  status: 404,
                  error: "Please provide an id",
                });
            const body = req.body;
            const options = {"new": true}
            const product = await ProductServices.updateProductById(id, body, options);
            if(!product) return res.status(400).json({
                status: 400, 
                message: `This product doesn't exist`, 
            })
            res.status(200).json({ status: 200, message: `Successfully updated ${product.name}.`, product: product })
        } catch (error) {
            res.status(500).json({ status: 500, error: "Server Error" });
        }
    }
}