import React, { useContext, useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout.jsx';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input.jsx';
import { validateEmail } from '../../utils/helper.js';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector.jsx';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import { UserContext } from '../../context/UserContext';
import uplaodImage from '../../utils/uploadImage.js';



const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);

    const { updateUser } = useContext(UserContext);

    const navigate = useNavigate();


    //Handle Sign Up form submit
    const handleSignUp = async (e) => {
        e.preventDefault();

        let profileImageUrl = "";

        if (!fullName) {
            setError("Please enter your full name");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!password) {
            setError("Please enter the password");
            return;
        }

        setError("");

        //signup api call
        try {

            //upload img if prsnt
            if (profilePic) {
                const imgUploadRes = await uplaodImage(profilePic);
                profileImageUrl = imgUploadRes.imageUrl || "";
            }
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl
            });

            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                updateUser(user);
                navigate("/dashboard");
            }

        } catch (error) {
            if (error.response && error.response.data.message) {

                setError(error.response.data.message);
            }
            else {

                setError("Something went wrong. Please try again.");
            }
        }
    }
    return (
        <AuthLayout>
            <div className='pt-40 lg:w-[100%] md:h-full md:mt-0 h-auto flex flex-col justify-center'>
                <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
                <p className='text-xs text-slate-700 mt-[5px] mb-6'>
                    Join us today by entering your details below
                </p>

                <form onSubmit={handleSignUp} className='form-for-signup'>

                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <Input
                            value={fullName}
                            onChange={({ target }) => setFullName(target.value)}
                            label="Full Name"
                            placeholder="Shaf"
                            type="text"
                        />

                        <Input
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            label="Email Address"
                            placeholder="shaf@example.com"
                            type="text"
                        />
                        <div className='col-span-2'>
                            <Input
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                                label="Password"
                                placeholder="Min 8 characters"
                                type="password"
                                autocomplete="new-password"
                            />
                        </div>
                    </div>
                    {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

                    <button type='submit' className='btn-primary'>
                        SIGN UP
                    </button>
                    <p className='text-[13px] text-slate-800 mt-3'>
                        Already have an account?{" "}
                        <Link className='font-medium text-primary underline' to="/login">login</Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}
//37:01


export default SignUp;