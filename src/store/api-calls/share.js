import axios from './axios-client';

/*
* API Method Naming Convention:
* 1. List API - listMethodName()
* 2. Detail API - retrieveMethodName()
* 3. Update - updateMethodName()
* 4. Add - createMethodName()
* */

export default {
    async sendCommunicationShare(formData) {
        try {
            const response = await axios.post('share/communication', formData);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },

    async listCommunicationShareByApplicationUserID(applicationUserID) {
        try {
            const response = await axios.get(`share/communication/${applicationUserID}`);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },

    async listReferralsForCurrentUser(referral_type = "") {
        try {
            if (referral_type.length > 0) {
                referral_type = `/${referral_type}`
            }
            const response = await axios.get(`share/referrals${referral_type}`);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },

    async listFollowUpsForCurrentUser(followup_type = "") {
        try {
            if (followup_type.length > 0) {
                followup_type = `/${followup_type}`
            }
            const response = await axios.get(`share/followups${followup_type}`);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },

    async listAllActivityNotifications(page = 1) {
        try {
            const response = await axios.get(`share/notifications/all?page=${page}`);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },
}