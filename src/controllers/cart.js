import Admin from "../services/admin";
import CategoryServices from "../services/category";

export default class CartController {
    static async addToCart(req, res) {
        try {
            const { userId, items } = req.body;
            const category = { name };
            const checkCategory = await CategoryServices.checkCategory(name);
            if (checkCategory) return res.status(409).json({message: 'This category already exists.'});
            const newCategory = await Admin.addCategory(category);
            return res.status(201).json({ status: 201, message: `A new category has been added!`, data: newCategory});
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: 500, error: "Server Error" });
        }
    }

    static async getCategories(req, res) {
        try {
            const categories = await CategoryServices.getCategories();
            if(categories.length <= 0) return res.status(400).json({ status: 400, message: `No categories have been added.`, })
            res.status(200).json({ status: 200, categories: categories, })
        } catch (error) {
            res.status(500).json({ status: 500, error: "Server Error" });
        }
    }

    static async getCategory(req, res) {
        try {
            console.log(req.params)
            const { id } = req.params;
            if (!id) return res.status(404).json({
                status: 404,
                error: "Please provide an id",
              });
            const category = await CategoryServices.getCategory(id);
            if(!category) return res.status(400).json({ status: 400, message: `This category doesn't exist`, })
            res.status(200).json({ status: 200, category: category, })
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: 500, error: "Server Error" });
        }
    }

    static async deleteCategory(req, res) {
        try {
            console.log(req.params)
            const { id } = req.params;
            if (!id) return res.status(404).json({
                status: 404,
                error: "Please provide an id",
              });
            const category = await CategoryServices.deleteCategory(id);
            if(!category) return res.status(400).json({
                 status: 400, 
                 message: `This category doesn't exist`, 
                })
            res.status(200).json({ status: 200, message: `${category.name} has been deleted.`, })
        } catch (error) {
            res.status(500).json({ status: 500, error: "Server Error" });
        }
    }

    static async updateCategory(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(404).json({
                  status: 404,
                  error: "Please provide an id",
                });
            const body = req.body;
            const options = {"new": true}
            const category = await CategoryServices.updateCategory(id, body, options);
            if(!category) return res.status(400).json({
                status: 400, 
                message: `This category doesn't exist`, 
            })
            res.status(200).json({ status: 200, message: `Successfully updated!`, category: category })
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: 500, error: "Server Error" });
        }
    }
}