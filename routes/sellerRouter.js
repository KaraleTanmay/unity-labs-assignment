const express = require("express");
const sellerController = require("../controllers/sellerController");

const sellerRouter = express.Router();

sellerRouter
    .get("/orders", sellerController.getOrders)
    .post("/create-catalog", sellerController.createCatalog);

module.exports = sellerRouter;
