import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(process.env.MONGO_DB, {useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", () => {
    console.log("Connected to MongoDB.");
});

module.exports = db;