import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Modal from '../Modal';
import Input from '../Inputs/Input';
import ProfilePhotoSelector from '../Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import uploadImage from '../../utils/uploadImage';
import toast from 'react-hot-toast';

const EditProfileModal = ({ isOpen, onClose }) => {
    const { user, updateUser } = useContext(UserContext);
    const [fullName, setFullName] = useState(user?.fullName || '');
    const [profilePic, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fullName.trim()) {
            setError('Full name is required');
            return;
        }

        setLoading(true);
        setError('');

        try {
            let profileImageUrl = user?.profileImageUrl || '';

            // Upload new image if selected
            if (profilePic) {
                const imageUploadResponse = await uploadImage(profilePic);
                profileImageUrl = imageUploadResponse.imageUrl || '';
            }

            // Update user profile
            const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_USER, {
                fullName: fullName.trim(),
                profileImageUrl
            });

            if (response.data) {
                updateUser(response.data);
                toast.success('Profile updated successfully!');
                onClose();
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Failed to update profile. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setFullName(user?.fullName || '');
        setProfilePic(null);
        setError('');
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Edit Profile"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col items-center">
                    <ProfilePhotoSelector
                        image={profilePic}
                        setImage={setProfilePic}
                        currentImageUrl={user?.profileImageUrl}
                    />
                </div>

                <Input
                    value={fullName}
                    onChange={({ target }) => setFullName(target.value)}
                    label="Full Name"
                    placeholder="Enter your full name"
                    type="text"
                    required
                />

                {error && (
                    <p className="text-red-500 text-xs">{error}</p>
                )}

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditProfileModal;
