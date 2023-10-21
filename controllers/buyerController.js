const Catalog = require("../models/catalogModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");

exports.getSellerList = catchAsync(async (req, res, next) => {
    const sellers = await User.find({ usertype: "seller" });
    res.status(200).json({
        status: "success",
        data: {
            sellers,
        },
    });
});

exports.getSellerCatalog = catchAsync(async (req, res, next) => {
    // get seller id
    const seller = req.params.seller_id;

    // get the catalog belonging to that seller
    const catalog = await Catalog.findOne({ seller })
        .populate("products")
        .populate("seller");

    //  if seller do not have any catalog
    if (!catalog) {
        return next(new appError("this seller does not have any catalog", 404));
    }

    res.status(200).json({
        status: "okay",
        data: {
            catalog,
        },
    });
});

exports.createOrder = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: "okay",
        data: "working",
    });
});
