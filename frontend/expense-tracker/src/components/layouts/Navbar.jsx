import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import logo from '../../assets/images/money.png'
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    return (
        <div className='flex gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30'>
            <button
                className='block lg:hidden text-black'
                onClick={() => {
                    setOpenSideMenu(!openSideMenu);
                }}
            >
                {openSideMenu ? (
                    <HiOutlineX className='text-2xl' />
                ) : (
                    <HiOutlineMenu className='text-2xl' />
                )}


            </button>
            <div className='flex items-center gap-2 ml-8 lg:ml-0'>
                <img src={logo} alt="TrakHive Logo" className='w-6 h-6' />
                <h2 className='text-lg font-medium text-black'>TrakHive</h2>
            </div>

            {
                openSideMenu && (
                    <div className='fixed top-[61px] -ml-4 bg-white'>
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                )
            }
        </div>
    )
}

export default Navbar