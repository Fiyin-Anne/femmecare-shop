import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String, 
        required: true
    },
    author:  {
        type: String,
        default: "Unknown"
    },
    category: {
        type: String, 
        required: true},
    shelf:  {
        type: Number
    },
    numAvailable:  {
        type: Number
    }
    
});

module.exports = mongoose.model('Book', BookSchema);