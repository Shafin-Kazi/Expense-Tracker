const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // Check if MONGO_URI exists
        if (!process.env.MONGO_URI) {
            console.log("MONGO_URI environment variable is not defined - continuing without database");
            return;
        }

        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("MongoDB connected successfully");
    }
    catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
        console.log("Continuing without database connection...");
        // Don't exit the process, just continue
    }
};

module.exports = connectDB;