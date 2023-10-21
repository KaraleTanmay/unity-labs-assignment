const express = require("express");
const authController = require("../controllers/authController");

const userRouter = express.Router();

userRouter
    .post("/register", authController.register)
    .post("/login", authController.login);

module.exports = userRouter;
