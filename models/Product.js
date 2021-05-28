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

module.exports = mongoose.model("product", ProductSchema);
