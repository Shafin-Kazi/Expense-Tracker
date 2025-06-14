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
    // console.log('Expenses:', transactions); // Debugging aid
    console.log("Expenses passed to component:", transactions);

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Expenses</h5>

                <button className='card-btn' onClick={onSeeMore}>
                    See All <LuArrowRight className='text-base' />
                </button>
            </div>

            <div className='mt-6'>
                {transactions?.slice(0, 5)?.map((expense) => (
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

                }
            </div>
        </div>
    );
};

export default ExpenseTransactions;
