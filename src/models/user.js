import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true},
    role:  {
        type: String,
        default: "User"
    }
});

module.exports = mongoose.model('User', UserSchema);