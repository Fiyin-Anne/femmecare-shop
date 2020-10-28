import Cart from "../models/cart";

export default class CartServices {
    static async checkCart(userId) {
      try {
        return await Cart.findOne({ userId });
      } catch (err) {
        throw err;
      }
    }

    static async newCart(userId, items) {
        try {
        return await Cart.create({
            userId: userId,
            items: [items]
          });
        } catch (err) {
        throw err;
        }
    }

    static async deleteCart(cartId) {
      try {
        return await Cart.findByIdAndDelete(cartId)
      } catch (err) {
        throw err;
      }
    }

}