const mongoose = require("mongoose");

const product = new mongoose.Schema({
    name: String,
    price: Number,
});

const StoreSchema = new mongoose.Schema({
    storeNo: {
        type: Number,
        required: true,
    },
    products: [product],
});

module.exports = mongoose.model("store", StoreSchema);
