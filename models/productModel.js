const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, "please mention the name of product"],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, "please mention the price of product"],
        },
    },
    {
        versionKey: false,
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
