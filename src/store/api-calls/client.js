import axios from './axios-client';

/*
* API Method Naming Convention:
* 1. List API - listMethodName()
* 2. Detail API - retrieveMethodName()
* 3. Update - updateMethodName()
* 4. Add - createMethodName()
* */

export default {
    async createVisitorLog(formData) {
        try {
            const response = await axios.post('client/visitor-logs', formData);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },
    async createCommunicationLog(formData) {
        try {
            const response = await axios.post('client/communication-logs', formData);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },



}