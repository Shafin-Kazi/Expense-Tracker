// Simple HTTP server without external dependencies
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://trakhive-fwly.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);

    // Simple health check
    if (parsedUrl.pathname === '/' || parsedUrl.pathname === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: "OK",
            message: "TrakHive Backend is running!",
            timestamp: new Date().toISOString(),
            note: "Temporary server while fixing npm install issues"
        }));
        return;
    }

    // For all other routes
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        message: "TrakHive Backend API",
        note: "Full API will be available once npm dependencies are resolved",
        endpoints: {
            auth: "/api/v1/auth",
            income: "/api/v1/income",
            expense: "/api/v1/expense",
            dashboard: "/api/v1/dashboard"
        }
    }));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Simple server running on port ${PORT}`);
    console.log('This is a temporary server while resolving npm install issues');
});

module.exports = server;
