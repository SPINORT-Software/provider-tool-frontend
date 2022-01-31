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
        // Modify the format of the date to YYYY-MM-DD
        formData.daily_workload_date =  String(formData.daily_workload_date.toISOString().slice(0, 10));
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
            return response.data;
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
            const response = await axios.put(`casemanager/workload/${workloadID}`, formData);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },


    /* Client Assessment API Calls */
    async createClientAssessment(formData) {
        try {
            const response = await axios.post('casemanager/client-assessment-create', formData);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },

    async listClientAssessmentByCaseManagerID(caseManagerID) {
        try {
            const response = await axios.get(`casemanager/${caseManagerID}/client-assessment`);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },

    async retrieveClientAssessmentData(assessmentUUID) {
        try {
            const response = await axios.get(`casemanager/client-assessment/${assessmentUUID}`);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },

    /* Client Intervention API Calls */
    async createClientIntervention(formData) {
        try {
            const response = await axios.post('casemanager/client-intervention-create', formData);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },

    async listClientInterventionByCaseManagerID(caseManagerID) {
        try {
            const response = await axios.get(`casemanager/${caseManagerID}/client-intervention`);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },

}



