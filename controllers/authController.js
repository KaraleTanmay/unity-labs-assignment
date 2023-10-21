const User = require("../models/userModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.register = catchAsync(async (req, res, next) => {
    //  get the user from request body
    const user = req.body;

    // check if provided passwords are atching or not
    if (user.password != user.passwordConfirm) {
        return next(new appError("provided passwords do not match", 400));
    }

    // checking if usertype is admin
    if (user.usertype == "admin") {
        return next(
            new appError("Your are not authorized to register as admin", 403)
        );
    }
    // create a new user
    const newUser = await User.create(user);

    res.status(200).json({
        status: "okay",
        data: newUser,
    });
});

exports.login = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: "okay",
        data: "working",
    });
});
