import axios from './axios-client';

export default {
    async uploadDocument(fileObject, fileType) {
        try {
            const formData = new FormData();
            formData.append('file', fileObject);
            formData.append('type', fileType);
            const response = await axios.post(`documents/upload/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            return error.response;
        }
    }
}

