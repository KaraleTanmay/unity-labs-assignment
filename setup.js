const fs = require("fs");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const Product = require("./models/productModel");

mongoose
    .connect("mongodb://127.0.0.1:27017/unitylabs_tanmay")
    .then(async () => {
        console.log("db connected");
        await addUsers();
        await addProducts();
    })
    .then(() => {
        process.exit(0);
    })
    .catch((err) => {
        console.log("database not connected" + err);
        process.exit(0);
    });

const users = JSON.parse(
    fs.readFileSync(`${__dirname}/data/users.json`, "utf-8")
);

const beautyProducts = JSON.parse(
    fs.readFileSync(`${__dirname}/data/products/beauty_products.json`, "utf-8")
);
const booksProducts = JSON.parse(
    fs.readFileSync(`${__dirname}/data/products/books_products.json`, "utf-8")
);
const electronicsProducts = JSON.parse(
    fs.readFileSync(
        `${__dirname}/data/products/electronics_products.json`,
        "utf-8"
    )
);
const furnitureProducts = JSON.parse(
    fs.readFileSync(
        `${__dirname}/data/products/furniture_products.json`,
        "utf-8"
    )
);
const groceryProducts = JSON.parse(
    fs.readFileSync(`${__dirname}/data/products/grocery_products.json`, "utf-8")
);

const addUsers = async function () {
    try {
        await User.create(users);
    } catch (error) {
        console.log("unable to add all users");
        console.log(error);
    }
    console.log("users added");
};

const addProducts = async function () {
    try {
        await Product.create([
            ...beautyProducts,
            ...booksProducts,
            ...electronicsProducts,
            ...furnitureProducts,
            ...groceryProducts,
        ]);
    } catch (error) {
        console.log("unable to add all products");
        console.log(error);
    }
    console.log("products added");
};
