const Catalog = require("../models/catalogModel");
const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");

// assumed functionality
// seller should be able to see al products to add into catalog
exports.getProducts = catchAsync(async (req, res, next) => {
    // get all the products
    const products = await Product.find();
    res.status(200).json({
        status: "created",
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
    res.status(200).json({
        status: "okay",
        data: "working",
    });
});

exports.createCatalog = catchAsync(async (req, res, next) => {
    // get the catalog details
    const catalog = req.body;
    catalog.seller = req.user.id;
    const newCatalog = await Catalog.create(catalog);
    res.status(201).json({
        status: "created",
        data: {
            newCatalog,
        },
    });
});
