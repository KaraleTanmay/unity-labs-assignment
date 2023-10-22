const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./configure.env" });
const app = require("./app");

// shutting down on uncaught exception
process.on("uncaughtException", (err) => {
    console.log("uncaught exception.. shutting down");
    console.log("error", err);
    process.exit(1);
});

// connecting to mongoDB atlas
// please comment out the env variable and uncomment the localhost connection to test on localhost
mongoose
    .connect(
        process.env.MONGO_STRING || "mongodb://127.0.0.1:27017/unitylabs_tanmay"
        // "mongodb://127.0.0.1:27017/unitylabs_tanmay"
    )
    .then(() => {
        console.log("db connected");
    })
    .catch((err) => {
        console.log("database not connected" + err);
    });

// starting express server
const server = app.listen(process.env.PORT, () => {
    console.log("server has been started on port " + process.env.PORT);
});

// shutting down server using close method to prevent abrupt shut down
process.on("unhandledRejection", (err) => {
    console.log("unhandled rejection.. shutting down");
    console.log("error", err);
    server.close(() => {
        process.exit(1);
    });
});
