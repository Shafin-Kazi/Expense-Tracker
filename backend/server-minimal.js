const express = require("express");
const cors = require("cors");

const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "TrakHive API Server is running",
        version: "1.0.0",
        timestamp: new Date().toISOString()
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({ 
        status: "OK", 
        message: "Server is healthy",
        timestamp: new Date().toISOString()
    });
});

// Test route
app.get("/test", (req, res) => {
    res.json({ message: "Backend is working!" });
});

// 404 handler
app.use("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
