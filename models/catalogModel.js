const mongoose = require("mongoose");
const Product = require("./productModel");

const catalogSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, "please provide the name of catalog"],
            trim: true,
            minlength: [5, "catalog name should be at least 5 characters long"],
            maxlength: [30, "only 30 characters are allowed"],
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique: true,
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                validate: {
                    // checking if product exists in database
                    validator: async function (value) {
                        return await Product.exists(value);
                    },
                    message: "this product id doesn't exists",
                },
            },
        ],
    },
    {
        versionKey: false,
    }
);

const Catalog = mongoose.model("Catalog", catalogSchema);

module.exports = Catalog;
