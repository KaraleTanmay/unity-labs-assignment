const express = require("express");
const sellerController = require("../controllers/sellerController");

const sellerRouter = express.Router();

sellerRouter
    .get("/orders", sellerController.getOrders)
    .post("/create-catalog", sellerController.createCatalog)
    // assumed functionality
    // seller should be able to create new products and see available products to add into catalog
    .get("/products", sellerController.getProducts)
    .post("/create-product", sellerController.createProduct);

module.exports = sellerRouter;
