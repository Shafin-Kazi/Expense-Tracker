import React, { useContext, useState } from 'react'
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import CharAvatar from '../Cards/CharAvatar';
import toast from 'react-hot-toast';
import EditProfileModal from '../Profile/EditProfileModal';
import { LuPencil } from 'react-icons/lu';


const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext);
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route === "/logout") {
            handleLogout();
            return;
        }

        navigate(route);
    };

    const handleLogout = () => {
        // Clear localStorage
        localStorage.clear();
        // Clear user context
        clearUser();
        // Show success message
        toast.success("Logged out successfully!");
        // Redirect to login page
        navigate("/login");
    }

    return <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20'>
        <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
            <div className='relative'>
                {user?.profileImageUrl ? (
                    <img src={user?.profileImageUrl || ""}
                        alt="Profile Image"
                        className='w-20 h-20 bg-slate-400 rounded-full object-cover'
                    />) : (
                    <CharAvatar
                        fullName={user?.fullName}
                        width="w-20"
                        height="h-20"
                        style="text-xl"
                    />
                )}

                <button
                    onClick={() => setIsEditProfileOpen(true)}
                    className='w-6 h-6 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer hover:bg-primary/90 transition-colors'
                    title="Edit Profile"
                >
                    <LuPencil className="text-xs" />
                </button>
            </div>

            <h5 className='text-gray-950 font-medium leading-6'>
                {user?.fullName || ""}
            </h5>
        </div>

        {SIDE_MENU_DATA.map((item, index) => (
            <button
                key={`menu_${index}`}
                className={`w-full flex items-center gap-4 text-[15px] 
        ${activeMenu === item.label ? "text-white bg-primary" : ""} 
        ${item.label === "Logout" ? "text-red-600 hover:bg-red-50" : "hover:bg-gray-50"}
        py-3 px-6 rounded-lg mb-3 transition-colors duration-200`}
                onClick={() => handleClick(item.path)}
            >
                <item.icon className="text-xl" />
                {item.label}
            </button>
        ))}

        <EditProfileModal
            isOpen={isEditProfileOpen}
            onClose={() => setIsEditProfileOpen(false)}
        />

    </div >
}

export default SideMenu