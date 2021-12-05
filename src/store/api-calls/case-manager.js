import axios from './axios-client';

/*
* API Method Naming Convention:
* 1. List API - listMethodName()
* 2. Detail API - retrieveMethodName()
* 3. Update - updateMethodName()
* 4. Add - createMethodName()
* */

export default {
    async createDailyWorkload(formData) {
        try {
            const response = await axios.post('casemanager/workload', formData);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },

    async listDailyWorkloadByCaseManagerID(caseManagerID) {
        try {
            const response = await axios.get(`casemanager/${caseManagerID}/workload`);
            return response.data.data.results;
        } catch (error) {
            return error.response;
        }
    },

    async listDailyWorkload() {
        try {
            const response = await axios.get('casemanager/workload');
            return response.data;
        } catch (error) {
            return error.response;
        }
    },

    async retrieveDailyWorkload(workloadID) {
        try {
            const response = await axios.get(`casemanager/workload/${workloadID}`);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },

    async updateDailyWorkload(workloadID, formData) {
        try {
            const response = await axios.put(`casemanager/workload/${workloadID}`);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },

    async createClientAssessment(formData) {
        try {
            const response = await axios.post('casemanager/client-assessment-create', formData);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },

}



