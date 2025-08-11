// Minimal server test
console.log('Step 1: Loading dependencies...');

require("dotenv").config({ path: __dirname + '/.env' });
console.log('Step 2: Dotenv loaded');

const express = require("express");
console.log('Step 3: Express loaded');

const cors = require("cors");
console.log('Step 4: CORS loaded');

const path = require("path");
console.log('Step 5: Path loaded');

const app = express();
console.log('Step 6: App created');

// Try loading each route file individually
console.log('Step 7: Testing route imports...');

try {
    console.log('Loading authRoutes...');
    const authRoutes = require("./routes/authRoutes");
    console.log('✅ authRoutes loaded successfully');
} catch (error) {
    console.error('❌ Error loading authRoutes:', error.message);
}

try {
    console.log('Loading incomeRoutes...');
    const incomeRoutes = require("./routes/incomeRoutes");
    console.log('✅ incomeRoutes loaded successfully');
} catch (error) {
    console.error('❌ Error loading incomeRoutes:', error.message);
}

try {
    console.log('Loading expenseRoutes...');
    const expenseRoutes = require("./routes/expenseRoutes");
    console.log('✅ expenseRoutes loaded successfully');
} catch (error) {
    console.error('❌ Error loading expenseRoutes:', error.message);
}

try {
    console.log('Loading dashboardRoutes...');
    const dashboardRoutes = require("./routes/dashboardRoutes");
    console.log('✅ dashboardRoutes loaded successfully');
} catch (error) {
    console.error('❌ Error loading dashboardRoutes:', error.message);
}

console.log('Test complete!');
