const express = require("express");
const morgan = require("morgan");
const appError = require("./utils/appError");
const authRouter = require("./routes/authRouter");
const buyerRouter = require("./routes/buyerRouter");
const sellerRouter = require("./routes/sellerRouter");
const errorController = require("./controllers/errorController");
const authController = require("./controllers/authController");

// creating app using express instance
const app = express();

// logger middleware
if ((process.env.ENV = "dev")) {
    app.use(morgan("dev"));
}

// middleware to access body of request
app.use(express.json());

// middlewares for required routes
app.use("/api/auth", authRouter);

// protecting buyer and seller routes so that only logged in members can access them
app.use(
    "/api/buyer",
    authController.protected,
    authController.restrictedTo("buyer", "admin"),
    buyerRouter
);
app.use(
    "/api/seller",
    authController.protected,
    authController.restrictedTo("seller", "admin"),
    sellerRouter
);

// invalid routes handler
app.all("*", (req, res, next) => {
    next(
        new appError(
            `requested route ${req.originalUrl} is not available on this server`,
            404
        )
    );
});

// globle error controller
app.use(errorController);

module.exports = app;
