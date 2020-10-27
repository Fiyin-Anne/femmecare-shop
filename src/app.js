import express from "express";
import "./database/index";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/user/user";
import cartRoutes from "./routes/user/cart";
import adminProductRoutes from "./routes/admin/product";
import adminCategoryRoutes from "./routes/admin/category";

const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const port = process.env.PORT;

app.get("/", (req, res) => {
    res.status(200).send({message: "Welcome to our ecommerce platform!"});
})
app.use("/api/user/", userRoutes);
app.use("/api/admin/", adminProductRoutes);
app.use("/api/admin/", adminCategoryRoutes);
app.use("/api/user/cart", cartRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})
module.exports = app;