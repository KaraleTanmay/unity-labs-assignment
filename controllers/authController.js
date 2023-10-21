const User = require("../models/userModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const sendToken = (user, statusCode, res) => {
    // create a jwt token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // set cookie
    res.cookie("jwt", token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 24 * 100
        ),
        httpOnly: true,
        // secure : process.env.ENV=="dev" ? false : true
    });

    user.password = null;
    res.status(statusCode).json({
        status: "success",
        data: {
            user,
        },
    });
};

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

    sendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
    // check if username and password is provided or not
    if (!username || !password) {
        return next(new appError("please provide username and password", 400));
    }

    // get the user using username
    const user = await User.findOne({ username }).select("+password");

    // check if user exists and password is correct
    if (!user || !(await user.checkPassword(password, user.password))) {
        return next(
            new appError("please provide correct username and password", 401)
        );
    }

    sendToken(user, 200, res);
});

exports.protected = catchAsync(async (req, res, next) => {
    let cookie = req.headers.cookie;
    // check if cookie is present in headers
    if (!cookie) {
        return next(new appError("please log in first", 401));
    }
    cookie = cookie.split("=")[1];

    // verify the token and get the payload
    const payload = await promisify(jwt.verify)(cookie, process.env.JWT_SECRET);

    // check if user still exists
    const user = await User.findById(payload.id);

    if (!user) {
        return next(
            new appError(
                "this user does not exist anymore. please create new account",
                401
            )
        );
    }
    req.user = user;
    next();
});

exports.restrictedTo = (...usertypes) => {
    return (req, res, next) => {
        if (!usertypes.includes(req.user.usertype)) {
            return next(
                new appError("Your are not authorized to access this page", 401)
            );
        }
        next();
    };
};
