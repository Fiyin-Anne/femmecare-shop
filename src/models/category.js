import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String, 
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);