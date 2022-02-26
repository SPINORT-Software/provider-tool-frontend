import axios from "./axios-client";

export default {
    /* Client Intervention API Calls */
    async createClientIntervention(formData) {
        try {
            const response = await axios.post('externalpartner/interventions', formData);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },

    async listClientInterventionByCaseManagerID(externalPartnerID) {
        try {
            const response = await axios.get(`externalpartner/${externalPartnerID}/interventions`);
            return response.data;
        } catch (error) {
            return error.response;
        }
    }
}