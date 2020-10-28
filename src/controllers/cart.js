import CartServices from "../services/cart";
const ObjectId = require('mongodb').ObjectID;

export default class CartController {
    static async addToCart(req, res) {
        try {
            const { _id } = req.decoded.user;
            const userId = _id;
            const { productId, quantity, name, price } = req.body;
            let userCart = await CartServices.checkCart(_id);
            if (userCart) {
                let itemIndex = userCart.items.findIndex(p => p.productId == productId);
                if (itemIndex > -1) {
                    let item = userCart.items[itemIndex];
                    item.quantity += quantity;
                    userCart.items[itemIndex] = item;
                } else {
                    userCart.items.push({ productId, quantity, name, price });
                }
                const cart = await userCart.save();
                return res.status(201).json({status: 201, message: "Added to cart!", cart});
            } else {
                const items = {productId, quantity, name, price}
                const newCart = await CartServices.newCart(userId, items)
                return res.status(201).send(newCart);
                }
        } catch (error) {
        res.status(500).json({ status: 500, error: "Server Error" });
        }
    }

    static async getCart(req, res) {
        try {
            const { _id } = req.decoded.user;
            let userCart = await CartServices.checkCart(_id);
                if (!userCart) return res.status(200).json({
                    status: 200,
                    message: "Cart is empty. Start shopping today!"
                });
                return res.status(200).json({status: 200, message: "This is your cart", userCart});
        } catch (error) {
            res.status(500).json({ status: 500, error: "Server Error" });
        }
    }

    static async deleteCart(req, res) {
        try {
            const { _id } = req.decoded.user;
            let userCart = await CartServices.checkCart(_id);
            if (!userCart) return res.status(200).json({
                status: 200,
                message: "Cart is empty. Start shopping today!"
            });
            let cartId = userCart._id;
            const deleteCart = await CartServices.deleteCart(cartId)
            if (deleteCart) return res.status(200).json({status: 200, message: "Cart is empty. Start shopping today!"});
        } catch (error) {
            res.status(500).json({ status: 500, error: "Server Error" });
        }
    }

}