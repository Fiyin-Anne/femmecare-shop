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
    categoryId: {
        type: [Number], 
        required: true
    },
    description:  {
        type: String
    }
    
});

module.exports = mongoose.model('Product', productSchema);