const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.get("/", (req, res) => {
    res.send("Welcome to my server");
});

app.get("/product", async (req, res) => {
    // res.json(req.query);
    if (Object.keys(req.query).length === 0) {
        res.status(400).json({
            msg: "query cannot be empty",
        });
        return;
    }

    // `(?i)^[${req.query.name}][a-zA-Z]+$`;

    try {
        const retrivedProducts = await Product.find({
            name: { $regex: `(?i)^${req.query.name}+.*$` },
        });
        res.status(200).json(retrivedProducts);
    } catch (error) {
        res.status(400).json({ error });
    }
});

app.post("/product", async (req, res) => {
    res.json(req.query);
    try {
        const newProduct = new Product({
            name: req.query.item,
            stores: req.query.store,
            avgPrice: req.query.price,
        });
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(400).json({
            error: error,
        });
    }
});

mongoose.connect(
    process.env.DB_KEY,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to DB");
        console.log(mongoose.connection.readyState);
    }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
