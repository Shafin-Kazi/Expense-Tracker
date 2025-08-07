import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30DaysExpenses = ({ data }) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        console.log("Last30DaysExpenses received data:", data);
        if (Array.isArray(data) && data.length > 0) {
            const result = prepareExpenseBarChartData(data);
            console.log("Last30DaysExpenses chart data:", result);
            setChartData(result);
        } else {
            setChartData([]);
        }

        return () => { };
    }, [data]);

    return (
        <div className='card col-span-l'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Last 30 Days Expenses</h5>
            </div>
            {chartData.length > 0 ? (
                <CustomBarChart data={chartData} />
            ) : (
                <div className="text-center py-8 text-gray-500">
                    <p>No expense data available for the last 30 days</p>
                    <p className="text-xs mt-1">Add some expenses to see the chart</p>
                </div>
            )}
        </div>
    )
}

export default Last30DaysExpenses