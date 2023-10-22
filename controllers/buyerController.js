const Catalog = require("../models/catalogModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const Order = require("../models/orderModel");

exports.getSellerList = catchAsync(async (req, res, next) => {
    // get the list of all sellers
    const sellers = await User.find({ usertype: "seller" });
    res.status(200).json({
        status: "success",
        data: {
            sellers,
        },
    });
});

exports.getSellerCatalog = catchAsync(async (req, res, next) => {
    // get seller id
    const seller = req.params.seller_id;

    // get the catalog belonging to that seller
    const catalog = await Catalog.findOne({ seller })
        .populate("products")
        .populate("seller");

    //  if seller do not have any catalog
    if (!catalog) {
        return next(new appError("this seller does not have any catalog", 404));
    }

    res.status(200).json({
        status: "okay",
        data: {
            catalog,
        },
    });
});

exports.createOrder = catchAsync(async (req, res, next) => {
    // check if order is not empty
    if (!req.body.products.length > 0) {
        return next(new appError("invalid order...order cannot be empty", 404));
    }
    // create order
    const order = {};
    order.products = req.body.products;
    order.buyer = req.user.id;
    order.seller = req.params.seller_id;

    // get the catalog of seller
    const catalog = await Catalog.findOne({
        seller: req.params.seller_id,
    }).populate("products");

    // check if catalog exists
    if (!catalog) {
        return next(
            new appError(
                "the seller do not exists or does not have any catalog",
                404
            )
        );
    }

    // check if all ordered products are valid and calculate the total amount
    const invalidProducts = [];
    const catalogItems = {};
    catalog.products.forEach(
        (product) => (catalogItems[product.id] = product.price)
    );

    let sum = 0;
    order.products.forEach((product) => {
        if (!catalogItems[product.productId]) {
            invalidProducts.push(product.productId);
        } else {
            sum += product.quantity * catalogItems[product.productId];
        }
    });
    order.amount = sum;

    // send error if there are invalid products
    if (invalidProducts.length) {
        return next(
            new appError(
                "these product do not belong to the seller's catalog : " +
                    invalidProducts.join(", "),
                400
            )
        );
    }

    // create the order
    const newOrder = await Order.create(order);
    res.status(201).json({
        status: "created",
        data: {
            newOrder,
        },
    });
});
