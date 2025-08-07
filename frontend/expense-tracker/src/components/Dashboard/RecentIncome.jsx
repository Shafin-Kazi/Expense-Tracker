import React from 'react'
import moment from 'moment'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'

const RecentIncome = ({ transactions, onSeeMore }) => {
    console.log("Income transactions passed to component:", transactions);
    console.log("Income transactions length:", transactions?.length);

    const hasTransactions = Array.isArray(transactions) && transactions.length > 0;

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Recent Income</h5>

                <button className='card-btn' onClick={onSeeMore}>
                    See All <LuArrowRight className='text-base' />
                </button>
            </div>
            <div className='mt-6'>
                {hasTransactions ? (
                    transactions.slice(0, 5).map((item) => (
                        <TransactionInfoCard
                            key={item._id}
                            title={item.source}
                            icon={item.icon}
                            date={moment(item.date).format("Do MMM")}
                            amount={item.amount}
                            type="income"
                            hideDeleteBtn
                        />
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <p>No income transactions available</p>
                        <p className="text-xs mt-1">Start adding income to see them here</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RecentIncome