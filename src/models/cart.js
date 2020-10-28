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
            name: String,
            quantity: Number,
            price: Number
        }
    ],
    modifiedAt: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Cart', cartSchema);