// const Income = require("../models/Income");
// const Expense = require("../models/Expense");
// const { isValidObjectId, Types } = require("mongoose");

// //Dashboard data
// const getDashboardData = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const userObjectId = new Types.ObjectId(String(userId));

//         //Fetch total income & expense
//         const totalIncome = await Income.aggregate([
//             { $match: { userId: userObjectId } },
//             { $group: { _id: null, total: { $sum: "$amount" } } },
//         ]);

//         console.log("totalIncome", { totalIncome, userId: isValidObjectId(userId) });

//         const totalExpense = await Expense.aggregate([
//             { $match: { userId: userObjectId } },
//             { $group: { _id: null, total: { $sum: "$amount" } } },

//         ]);

//         //Get income transactions in the last 60 days
//         const last60DaysIncomeTransactions = await Income.find({
//             userId,
//             date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 1000) },
//         }).sort({ date: -1 });

//         //Get total income in the last 60 days
//         const incomeLast60Days = last60DaysIncomeTransactions.reduce(
//             (sum, transaction) => sum + transaction.amount,
//             0
//         );

//         //Get expense transactions in the last 30 days
//         const last30DaysExpenseTransactions = await Expense.find({
//             userId,
//             date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 1000) },
//         }).sort({ date: -1 });

//         //Get total expense in the last 30 days
//         const expenseLast30Days = last30DaysExpenseTransactions.reduce(
//             (sum, transaction) => sum + transaction.amount,
//             0
//         );


//         //Fetch last 5 transactions (in+ex)
//         const lastTransactions = [
//             ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
//                 (txn) => ({
//                     ...txn.toObject(),
//                     type: 'income',
//                 })
//             ),
//             ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
//                 (txn) => ({
//                     ...txn.toObject(),
//                     type: 'expense',
//                 })
//             ),
//         ].sort((a, b) => b.date - a.date);//sort latest first

//         //Final Response
//         res.json({
//             totalBalance:
//                 (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
//             totalIncome: totalIncome[0]?.total || 0,
//             totalExpenses: totalExpense[0]?.total || 0,
//             last30DaysExpenses: {
//                 total: expenseLast30Days,
//                 transactions: last30DaysExpenseTransactions,
//             },

//             last60DaysIncome: {
//                 total: incomeLast60Days,
//                 transactions: last60DaysIncomeTransactions,
//             },
//             recentTransactions: lastTransactions,
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Server Error', error });
//     }
// }

// module.exports = { getDashboardData };

const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

const daysAgo = (numDays) => {
    const now = new Date();
    now.setDate(now.getDate() - numDays);
    return now;
};

const getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!isValidObjectId(userId)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        const userObjectId = new Types.ObjectId(String(userId));

        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: daysAgo(60) },
        })
            .sort({ date: -1 })
            .lean();

        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, txn) => sum + txn.amount,
            0
        );

        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: daysAgo(30) },
        })
            .sort({ date: -1 })
            .lean();

        const expenseLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, txn) => sum + txn.amount,
            0
        );

        const lastTransactions = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5).lean()).map(
                (txn) => ({
                    ...txn,
                    type: "income",
                })
            ),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5).lean()).map(
                (txn) => ({
                    ...txn,
                    type: "expense",
                })
            ),
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpenses: totalExpense[0]?.total || 0,
            last30DaysExpenses: {
                total: expenseLast30Days,


                transactions: last30DaysExpenseTransactions.sort(
                    (a, b) => new Date(a.date) - new Date(b.date)
                ),
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions.sort(
                    (a, b) => new Date(a.date) - new Date(b.date)
                ),
            },
            recentTransactions: lastTransactions,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error });
    }
};

module.exports = { getDashboardData };
