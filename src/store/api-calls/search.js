import axios from "./axios-client";

export default {

    async searchApplicationUsers(formData) {
        try {
            const response = await axios.post('core/appusers/search', formData);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },

    async listClientInterventionByCaseManagerID(externalPartnerID) {
        console.log("Test")
    }
}