const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const productsRoute = require("./routes/products");
const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

app.use(express.json());

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

// app.get("/", (req, res) => {
//     res.send("Welcome to my server");
// });

app.use("/product", productsRoute);
//log2214: show client side homepage
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

mongoose.connect(
    process.env.DB_KEY,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to DB");
        console.log(mongoose.connection.readyState);
    }
);

const PORT = process.env.PORT || 5000;
//Start the gk0715 server
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
