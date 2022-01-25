import axios from './axios-client';

/*
* API Method Naming Convention:
* 1. List API - listMethodName()
* 2. Detail API - retrieveMethodName()
* 3. Update - updateMethodName()
* 4. Add - createMethodName()
* 5. Set/Update - createOrUpdateMethodName()
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

    /*
    * Personal Information API
    * */
    async createOrUpdatePersonalInformation(formData) {
        try {
            const response = await axios.post('client/personal-create-update', formData);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },
    async retrievePersonalInformation(clientUUID) {
        try {
            const response = await axios.get(`client/${clientUUID}/personal`);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },

    /*
     * Clinical Information API
     * */
    async createOrUpdateClinicalInformation(formData) {
        try {
            const response = await axios.post('client/clinical-create-update', formData);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },
    async retrieveClinicalInformation(clientUUID) {
        try {
            const response = await axios.get(`client/${clientUUID}/clinical`);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },
}