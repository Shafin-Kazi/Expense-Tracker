
require("dotenv").config({ path: __dirname + '/.env' });
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes")
const incomeRoutes = require("./routes/incomeRoutes")
const expenseRoutes = require("./routes/expenseRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes")

const app = express();

// Health check route
app.get("/", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "TrakHive API Server is running",
        version: "1.0.0",
        environment: process.env.NODE_ENV || "development",
        database: process.env.MONGO_URI ? "connected" : "not configured",
        endpoints: {
            auth: "/api/v1/auth",
            income: "/api/v1/income",
            expense: "/api/v1/expense",
            dashboard: "/api/v1/dashboard"
        }
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Server is running",
        timestamp: new Date().toISOString()
    });
});

//middleware, cors ko handle krne k lie
app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            
            const allowedOrigins = [
                process.env.CLIENT_URL,
                process.env.CLIENT_URL?.replace(/\/$/, ''), // Remove trailing slash
                process.env.CLIENT_URL + '/', // Add trailing slash
                'https://trakhive-fwly.vercel.app',
                'https://trakhive-fwly.vercel.app/',
                'http://localhost:3000',
                'http://localhost:5173'
            ].filter(Boolean);
            
            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.log('CORS blocked origin:', origin);
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize database connection
connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

//server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Something went wrong!",
        error: process.env.NODE_ENV === 'production' ? {} : err.message
    });
});

// 404 handler
app.use("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

// Start server for all environments
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Database: ${process.env.MONGO_URI ? 'Connected' : 'Not configured'}`);
});

// Export for serverless platforms
module.exports = app;