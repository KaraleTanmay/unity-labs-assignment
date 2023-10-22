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
    },
    amount: {
        type: Number,
        required: [true, "order should have total amount"],
    },
});

// setting index on seller as query will be done by seller only
orderSchema.index({ seller: 1 });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
