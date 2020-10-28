import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(process.env.MONGO_DB, 
    {useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", () => {
    console.log("Connected to MongoDB.");
});

module.exports = db;