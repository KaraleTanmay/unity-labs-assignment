const Catalog = require("../models/catalogModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// assumed functionality
// seller should be able to see al products to add into catalog
exports.getProducts = catchAsync(async (req, res, next) => {
    // get all the products
    const products = await Product.find();
    res.status(200).json({
        status: "success",
        data: {
            products,
        },
    });
});

// assumed functionality
// seller should be able to create products to add into catalog
exports.createProduct = catchAsync(async (req, res, next) => {
    // get product from body
    const product = await Product.create(req.body);

    res.status(200).json({
        status: "created",
        data: {
            product,
        },
    });
});

exports.getOrders = catchAsync(async (req, res, next) => {
    // get orders for this seller
    const orders = await Order.find({ seller: req.user.id });

    res.status(200).json({
        status: "success",
        data: {
            orders,
        },
    });
});

exports.createCatalog = catchAsync(async (req, res, next) => {
    // get the catalog details
    const catalog = req.body;
    catalog.seller = req.user.id;

    // check if catalog is not empty
    if (!catalog.products || !catalog.products.length > 0) {
        return next(
            new appError("catalog cannot be empty. please add products", 400)
        );
    }
    // create the catalog
    const newCatalog = await Catalog.create(catalog);
    res.status(201).json({
        status: "created",
        data: {
            newCatalog,
        },
    });
});
