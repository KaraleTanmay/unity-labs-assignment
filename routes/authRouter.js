const express = require("express");
const authController = require("../controllers/authController");

const authRouter = express
    .Router()
    .post("/register", authController.register)
    .post("/login", authController.login);

module.exports = authRouter;
