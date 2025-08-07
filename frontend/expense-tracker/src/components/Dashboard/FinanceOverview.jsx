import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';
import { addThousandsSeparator } from '../../utils/helper';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"]

const FinanceOverview = ({ totalBalance, totalIncome, totalExpenses }) => {
    const balanceData = [
        { name: "Total Balance", amount: totalBalance || 0 },
        { name: "Total Expenses", amount: totalExpenses || 0 },
        { name: "Total Income", amount: totalIncome || 0 },
    ];

    const hasData = (totalBalance || 0) > 0 || (totalIncome || 0) > 0 || (totalExpenses || 0) > 0;

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Financial Overview</h5>
            </div>

            {hasData ? (
                <CustomPieChart
                    data={balanceData}
                    label="Total Balance"
                    totalAmount={`$${addThousandsSeparator(totalBalance || 0)}`}
                    colors={COLORS}
                    showTextAnchor
                />
            ) : (
                <div className="text-center py-8 text-gray-500">
                    <p>No financial data available</p>
                    <p className="text-xs mt-1">Start adding income and expenses to see the overview</p>
                </div>
            )}
        </div>
    )
}

export default FinanceOverview