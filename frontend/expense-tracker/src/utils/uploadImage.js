import { API_PATHS } from './apiPaths';
import axiosInstance from './axiosInstance';

const uplaodImage = async (imageFile) => {
    const formData = new FormData();
    //Append image file to form data
    formData.append('image', imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',//set header for file upload
            },
        });

        return response.data;//return response data
    } catch (error) {
        console.error('Error in uploading the image:', error);
        throw error; //rethrow error for handling
    }
};

export default uplaodImage;