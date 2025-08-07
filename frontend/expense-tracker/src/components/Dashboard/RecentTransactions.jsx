import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import TransactionInfoCard from '../Cards/TransactionInfoCard'

const RecentTransactions = ({ transactions, onSeeMore }) => {
    const hasTransactions = Array.isArray(transactions) && transactions.length > 0;

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Recent Transactions</h5>

                <button className='card-btn' onClick={onSeeMore}>
                    See All <LuArrowRight className='text-base' />
                </button>
            </div>

            <div className='mt-6'>
                {hasTransactions ? (
                    transactions.slice(0, 5).map((item) => (
                        <TransactionInfoCard
                            key={item._id}
                            title={item.type === 'expense' ? item.category : item.source}
                            icon={item.icon}
                            date={moment(item.date).format("Do MMM")}
                            amount={item.amount}
                            type={item.type}
                            hideDeleteBtn
                        />
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <p>No recent transactions available</p>
                        <p className="text-xs mt-1">Start adding income or expenses to see them here</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RecentTransactions