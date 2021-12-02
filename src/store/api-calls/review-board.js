import axios from './axios-client';

/*
* API Method Naming Convention:
* 1. List API - listMethodName()
* 2. Detail API - retrieveMethodName()
* 3. Update - updateMethodName()
* */
const urls = {
    'listReferralsByReviewBoardID': 'review-board/referral'
}

export default {
    async createReferral(referralData, referralForms, reviewBoardUser) {
        try {
            // Standardize organizations
            const organizationValues = referralData.organizations_upon_referral.map(organization => organization.label)
            referralData.organizations_upon_referral = organizationValues

            // Standardize members
            const membersValues = referralData.members_present_case_discussion.map(members => members.label)
            referralData.members_present_case_discussion = membersValues

            // Standardize referral source
            referralData.referral_source = referralData.referral_source.label
            referralData.case_management_organization_responsible = referralData.case_management_organization_responsible.label
            referralData.review_board_user = reviewBoardUser

            const formData = {
                "data": {
                    ...referralData
                },
                "referral_forms": {
                    ...referralForms
                }
            }

            const response = await axios.post('review-board/referral-create', formData);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },

    async listReferralsByReviewBoardID(reviewBoardID) {
        try {
            const response = await axios.get(`review-board/${reviewBoardID}/referral`);
            return response.data.data.results;
        } catch (error) {
            return error.response;
        }
    },

    async listReferrals() {
        try {
            const response = await axios.get('review-board/referral');
            return response.data;
        } catch (error) {
            return error.response;
        }
    },

    async retrieveReferral(referralID) {
        try {
            referralID = '383f252a-5216-4aa2-b2fc-def96faae629';
            const response = await axios.get(`review-board/referral/${referralID}`);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },

    async updateReferral(referralID, formData) {
        formData = {
            "client_first_name": "Referral",
            "client_last_name": "Test",
            "client_email": "referral.test@ccc.com",

            "review_board_user": "9ac96e2c-2694-487e-9bab-d87f3bc21bcf",
            "referral_date": "2021-10-05",

            "referral_source": "Ability Updated",
            "referral_source_detail": "",

            "organizations_upon_referral": ["Ability NB", "Ambulatory Clinic"],
            "organizations_upon_referral_detail": "",

            "date_of_case_discussion": "2021-10-05",

            "members_present_case_discussion": ["Ability NB", "Ambulatory Clinic"],
            "members_present_case_discussion_detail": "",

            "case_management_organization_responsible": "Ability NB",
            "case_management_organization_person_responsible": "Manager Ability NB",

            "decision": "POTENTIAL_CLIENT",
            "decision_detail": "Client not accepted yet.",
            "referral_forms": {
                "emp_referral_request": ["20ddfbf8-35ae-48eb-8e0b-32c586355d2c"],
                "familiar_faces_snat": ["20ddfbf8-35ae-48eb-8e0b-32c586355d2c"],
                "familiar_faces_sdh": ["20ddfbf8-35ae-48eb-8e0b-32c586355d2c"]
            }
        }

        try {
            referralID = '383f252a-5216-4aa2-b2fc-def96faae629';
            const response = await axios.put(`review-board/referral/${referralID}`, formData);
            return response.data;
        } catch (error) {
            return error.response;
        }
    }
}

