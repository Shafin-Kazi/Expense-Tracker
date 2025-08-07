import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart';
import { addThousandsSeparator } from '../../utils/helper';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {

    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {
        console.log("RecentIncomeWithChart received data:", data);
        if (Array.isArray(data) && data.length > 0) {
            const dataArr = data.map((item) => ({
                name: item?.source || 'Unknown',
                amount: item?.amount || 0,
            }));
            console.log("RecentIncomeWithChart chart data:", dataArr);
            setChartData(dataArr);
        } else {
            setChartData([]);
        }
    };

    useEffect(() => {
        prepareChartData();

        return () => { };
    }, [data]);

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Last 60 Days Income</h5>
            </div>

            {chartData.length > 0 ? (
                <CustomPieChart
                    data={chartData}
                    label="Total Income"
                    totalAmount={`$${addThousandsSeparator(totalIncome || 0)}`}
                    showTextAnchor
                    colors={COLORS}
                />
            ) : (
                <div className="text-center py-8 text-gray-500">
                    <p>No income data available for the last 60 days</p>
                    <p className="text-xs mt-1">Add some income to see the chart</p>
                </div>
            )}
        </div>
    )
}

export default RecentIncomeWithChart