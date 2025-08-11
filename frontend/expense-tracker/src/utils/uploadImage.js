import { API_PATHS } from './apiPaths';
import axiosInstance from './axiosInstance';

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    //Append image file to form data
    formData.append('image', imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',//set header for file upload
            },
        });

        if (response && response.data) {
            return response.data;//return response data
        } else {
            throw new Error('No data received from server');
        }
    } catch (error) {
        console.error('Error in uploading the image:', error);
        console.error('Error response:', error.response?.data);
        console.error('Error status:', error.response?.status);
        throw error; //rethrow error for handling
    }
};

export default uploadImage;