import React, { useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverview from '../../components/Income/IncomeOverview';

const Income = () => {

    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);
    //get all income details
    const fetchIncomeDetails = async () => { };

    //handle add income
    const handleAddIncome = async (income) => { };

    //Delete income
    const deleteIncome = async (id) => { };

    //handle download income details
    const handleDownloadIncomeDetails = async () => { };



    return (
        <DashboardLayout activeMenu="Income">
            <div className='my-5 mx-auto'>
                <div className='grid grid-cols-l gap-6'>
                    <div className=''>
                        <IncomeOverview
                            transactions={incomeData}
                            onAddIncome={() => setOpenAddIncomeModel(true)}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>

    )
}


export default Income;