// Test file to isolate the router error
console.log('Starting test...');

try {
    console.log('Requiring express...');
    const express = require('express');
    console.log('Express loaded successfully');

    console.log('Creating app...');
    const app = express();
    console.log('App created successfully');

    console.log('Testing router...');
    const router = express.Router();
    console.log('Router created successfully');

    console.log('All tests passed!');
} catch (error) {
    console.error('Error occurred:', error.message);
    console.error('Stack:', error.stack);
}
