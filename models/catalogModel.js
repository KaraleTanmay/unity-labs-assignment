const mongoose = require("mongoose");

const catalogSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: [true, "This name is not available"],
            required: [true, "please provide the name of catalog"],
            trim: true,
            minlength: [5, "catalog name should be at least 5 characters long"],
            maxlength: [30, "only 30 characters are allowed"],
        },
        seller: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            unique: [true, "only one catalog allowed per seller"],
        },
        products: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
            },
        ],
    },
    {
        versionKey: false,
    }
);

const Catalog = mongoose.model("Catalog", catalogSchema);

module.exports = Catalog;
