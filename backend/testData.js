const mongoose = require('mongoose');
const Expense = require('./models/Expense');
const Income = require('./models/Income');
const User = require('./models/User');
require('dotenv').config();

const connectDB = require('./config/db');

const addTestData = async () => {
    try {
        await connectDB();
        
        // Find the first user (or create one if none exists)
        let user = await User.findOne();
        if (!user) {
            console.log('No user found. Please create a user first.');
            return;
        }

        console.log('Adding test data for user:', user._id);

        // Add test expenses
        const testExpenses = [
            {
                userId: user._id,
                category: 'Food',
                amount: 150,
                date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
                icon: '🍕'
            },
            {
                userId: user._id,
                category: 'Transport',
                amount: 80,
                date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
                icon: '🚗'
            },
            {
                userId: user._id,
                category: 'Shopping',
                amount: 200,
                date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
                icon: '🛍️'
            },
            {
                userId: user._id,
                category: 'Bills',
                amount: 300,
                date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
                icon: '📄'
            }
        ];

        // Add test income
        const testIncome = [
            {
                userId: user._id,
                source: 'Salary',
                amount: 5000,
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
                icon: '💰'
            },
            {
                userId: user._id,
                source: 'Freelance',
                amount: 800,
                date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
                icon: '💼'
            },
            {
                userId: user._id,
                source: 'Investment',
                amount: 300,
                date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
                icon: '📈'
            },
            {
                userId: user._id,
                source: 'Bonus',
                amount: 1000,
                date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000), // 18 days ago
                icon: '🎁'
            }
        ];

        // Clear existing test data
        await Expense.deleteMany({ userId: user._id });
        await Income.deleteMany({ userId: user._id });

        // Add new test data
        await Expense.insertMany(testExpenses);
        await Income.insertMany(testIncome);

        console.log('Test data added successfully!');
        console.log('Added', testExpenses.length, 'expenses and', testIncome.length, 'income records');

        process.exit(0);
    } catch (error) {
        console.error('Error adding test data:', error);
        process.exit(1);
    }
};

addTestData(); 