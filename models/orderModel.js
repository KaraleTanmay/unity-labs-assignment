const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "please provide buyer id"],
    },
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "please provide seller id"],
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    products: {
        type: [
            new mongoose.Schema(
                {
                    productId: {
                        type: mongoose.Schema.ObjectId,
                        ref: "Product",
                    },
                    quantity: {
                        type: Number,
                        default: 1,
                        min: [1, "minimum quantity allowed is 1"],
                    },
                },
                {
                    _id: false,
                }
            ),
        ],
        validate: {
            validator: function (value) {
                return value.length > 0;
            },
            message: "Order should have at least one product.",
        },
    },
    amount: {
        type: Number,
        required: [true, "order should have total amount"],
    },
});

orderSchema.path("products").validate(function (value) {
    return value.length > 0;
}, "Order should have at least one product.");

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
