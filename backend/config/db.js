const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();


exports.connectdb = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("DB connected");
        })
        .catch((err) => {
            console.log(err.message);
        });
};

