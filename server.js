const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
dotenv.config({ path: "./configure.env" });

process.on("uncaughtException", (err) => {
    console.log("uncaught exception.. shutting down");
    console.log("error", err);
    process.exit(1);
});

mongoose
    .connect(
        process.env.MONGO_STRING
        // || "mongodb://127.0.0.1:27017/unitylabs_tanmay"
    )
    .then(() => {
        console.log("db connected");
    })
    .catch((err) => {
        console.log("bd not connected" + err);
    });

const server = app.listen(process.env.PORT, () => {
    console.log("server has been started on port " + process.env.PORT);
});

process.on("unhandledRejection", (err) => {
    console.log("unhandled rejection.. shutting down");
    console.log("error", err);
    server.close(() => {
        process.exit(1);
    });
});
