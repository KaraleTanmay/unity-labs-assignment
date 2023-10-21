const express = require("express");
const buyerController = require("../controllers/buyerController");

const buyerRouter = express.Router();

buyerRouter
    .get("/list-of-sellers", buyerController.getSellerList)
    .get("/seller-catalog/:seller_id", buyerController.getSellerCatalog)
    .post("/create-order/:seller_id", buyerController.createOrder);

module.exports = buyerRouter;
