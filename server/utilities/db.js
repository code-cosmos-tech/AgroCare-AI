const mongoose = require("mongoose");

const URI = process.env.URI;
const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("mongoose connected...")
    } catch (error) {
        console.log("db refused to connect.")
        console.log(error);
        process.exit(0);
    }
}

module.exports = connectDb;