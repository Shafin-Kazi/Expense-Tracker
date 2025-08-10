const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // Check if MONGO_URI exists
        if (!process.env.MONGO_URI) {
            console.error("MONGO_URI environment variable is not defined");
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("MongoDB connected successfully");
    }
    catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
        // Don't exit in production, let the app continue without DB
        if (process.env.NODE_ENV === 'production') {
            console.log("Continuing without database connection...");
        } else {
            process.exit(1);
        }
    }
};

module.exports = connectDB;