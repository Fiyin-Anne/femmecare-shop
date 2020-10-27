import mongoose from "mongoose";

const { Schema } = mongoose;

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    items:[
        {
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: Number,
        price: Number
      }
    ]
});

module.exports = mongoose.model('Cart', cartSchema);