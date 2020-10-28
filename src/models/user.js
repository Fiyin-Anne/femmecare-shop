import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String, 
        required: true, 
        unique: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    verify_password: {
        type: String, 
        required: true
    },
    role:  {
        type: String,
        default: "User"
    },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);