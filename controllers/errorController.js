const appError = require("../utils/appError");

const sendDevErrors = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendProdErrors = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        console.log("error", err);
        res.status(500).json({
            status: "error",
            message: "something went wrong",
            err,
        });
    }
};

module.exports = (err, req, res, next) => {
    err.status = err.status || "error";
    err.statusCode = err.statusCode || 404;

    if (process.env.ENV == "dev") {
        sendDevErrors(err, res);
    } else {
        let error = { ...err };
        sendProdErrors(error, res);
    }
};
