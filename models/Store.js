const mongoose = require("mongoose");

const product = new mongoose.Schema({
    name: String,
    price: Number, //01001011
});

const StoreSchema = new mongoose.Schema({
    storeNo: {
        type: Number,
        required: true,
    },
    products: [product],
});
//0709: store model, later added

module.exports = mongoose.model("store", StoreSchema);
