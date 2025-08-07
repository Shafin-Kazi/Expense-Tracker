// import React from 'react'
// import moment from 'moment'
// import { LuArrowRight } from 'react-icons/lu'
// import TransactionInfoCard from '../Cards/TransactionInfoCard'

// const ExpenseTransactions = ({ transactions, onSeeMore }) => {

//     return (
//         <div className='card'>
//             <div className='flex items-center justify-between'>
//                 <h5 className='text-lg'>Expenses</h5>

//                 <button className='card-btn' onClick={onSeeMore}>
//                     See All <LuArrowRight className='text-base' />
//                 </button>

//             </div>

//             <div className='mt-6'>
//                 {transactions?.slice(0, 5)?.map((expense) => (
//                     <TransactionInfoCard
//                         key={expense._id}
//                         title={expense.category}
//                         icon={expense.icon}
//                         date={moment(expense.date).format("Do MMM")}
//                         amount={expense.amount}
//                         type="expense"
//                         hideDeleteBtn
//                     />

//                 ))}
//             </div>
//         </div>
//     )
// }

// export default ExpenseTransactions


import React from 'react';
import moment from 'moment';
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
    console.log("Expenses passed to component:", transactions);
    console.log("Expenses length:", transactions?.length);

    const hasTransactions = Array.isArray(transactions) && transactions.length > 0;

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Recent Expenses</h5>

                <button className='card-btn' onClick={onSeeMore}>
                    See All <LuArrowRight className='text-base' />
                </button>
            </div>

            <div className='mt-6'>
                {hasTransactions ? (
                    transactions.slice(0, 5).map((expense) => (
                        <TransactionInfoCard
                            key={expense._id}
                            title={expense.category}
                            icon={expense.icon}
                            date={moment(expense.date).format('Do MMM')}
                            amount={expense.amount}
                            type="expense"
                            hideDeleteBtn
                        />
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <p>No expense transactions available</p>
                        <p className="text-xs mt-1">Start adding expenses to see them here</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpenseTransactions;
