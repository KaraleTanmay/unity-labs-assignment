const catchAsync = require("../utils/catchAsync");

exports.getSellerList = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: "okay",
        data: "working",
    });
});

exports.getSellercatalog = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: "okay",
        data: "working",
    });
});

exports.createOrder = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: "okay",
        data: "working",
    });
});
