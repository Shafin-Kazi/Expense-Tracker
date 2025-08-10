// Simple serverless function for Vercel
module.exports = (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    // Simple health check
    if (req.url === '/' || req.url === '/health') {
        res.status(200).json({
            status: "OK",
            message: "TrakHive API is running!",
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.url,
            note: "Backend is working - environment variables need to be configured in Vercel dashboard"
        });
        return;
    }
    
    // For all other routes, return info message
    res.status(200).json({
        message: "TrakHive Backend API",
        endpoints: {
            auth: "/api/v1/auth",
            income: "/api/v1/income", 
            expense: "/api/v1/expense",
            dashboard: "/api/v1/dashboard"
        },
        note: "Please add MONGO_URI and JWT_SECRET environment variables in Vercel dashboard to enable full functionality"
    });
};
