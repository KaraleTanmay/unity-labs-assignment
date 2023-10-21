const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, "This username is not available"],
            trim: true,
            minlength: [5, "username should be at least 5 characters long"],
            maxlength: [30, "only 30 characters are allowed"],
        },
        usertype: {
            type: String,
            enum: {
                values: ["admin", "buyer", "seller"],
                message: "only buyer and seller are allowed",
            },
            default: "buyer",
        },
        email: {
            type: String,
            unique: false,
            required: [true, "please provide email"],
            trim: true,
            lowercase: true,
            validate: [validator.isEmail, "entered email is not valid"],
        },
        password: {
            type: String,
            required: [true, "please provide password"],
            minlength: [8, "password should have atleast 8 characters"],
            select: false,
        },
    },
    {
        versionKey: false,
    }
);

userSchema.index({ username: 1, email: 1 }, { unique: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.checkPassword = async function (
    candidatePassword,
    password
) {
    return await bcrypt.compare(candidatePassword, password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
