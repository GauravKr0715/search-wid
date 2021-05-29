const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    stores: {
        type: Number,
        required: true,
    },
    avgPrice: {
        type: Number,
        required: true,
    },
});
//2214: product model, used earlier // 00110000

module.exports = mongoose.model("product", ProductSchema);
