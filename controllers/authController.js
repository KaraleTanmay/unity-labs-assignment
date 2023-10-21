const catchAsync = require("../utils/catchAsync");

exports.register = catchAsync(async (req, res, next) => {
    console.log(req.body);
    res.status(200).json({
        status: "okay",
        data: "working",
    });
});

exports.login = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: "okay",
        data: "working",
    });
});
