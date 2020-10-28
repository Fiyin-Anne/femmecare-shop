import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    price:  {
        type: Number,
        required: true
    },
    category: {
        type: [String],
        ref: "Category",
        default: undefined
    },
    description:  {
        type: String
    },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);