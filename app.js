const express = require("express");
const morgan = require("morgan");
const appError = require("./utils/appError");
const userRouter = require("./routes/userRouter");
const buyerRouter = require("./routes/buyerRouter");
const sellerRouter = require("./routes/sellerRouter");
const errorController = require("./controllers/errorController");

// creating app using express instance
const app = express();

// logger middleware
if ((process.env.ENV = "dev")) {
    app.use(morgan("dev"));
}

app.use(express.json());
app.use("/api/auth", userRouter);
app.use("/api/buyer", buyerRouter);
app.use("/api/seller", sellerRouter);

// invalid routes handler
app.all("*", (req, res, next) => {
    next(
        new appError(
            `requested route ${req.originalUrl} is not available on this server`,
            404
        )
    );
});

app.use(errorController);

module.exports = app;
