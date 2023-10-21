const catchAsync = require("../utils/catchAsync");

exports.getOrders = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: "okay",
        data: "working",
    });
});

exports.createCatalog = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: "okay",
        data: "working",
    });
});
