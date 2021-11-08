// action - state management
import * as actionTypes from 'store/actionTypes';

export const initialState = {
    clientDetail: {
        firstName: '',
        lastName: '',
        email: ''
    },
    referralDetail: {
        referralDate: '',
        discussionDate: '',
        referralSource: '',
        referralOrganizations: '',
        referralOrganizationsDetail: '',
        membersPresentCaseDiscussion: '',
        membersPresentCaseDiscussionDetail: '',
        caseManagementOrganization: '',
        caseManagementOrganizationDetail: '',
        decision: '',
        decisionReason: ''
    }
};

const clientReferralReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REVIEW_BOARD_REFERRAL_SET_CLIENT_DETAIL: {
            // eslint-disable-next-line camelcase
            const {client_referral_first_name, client_referral_last_name, client_referral_email} = action.data
            return {
                ...state,
                clientDetail: {
                    ...state.clientDetail,
                    firstName: client_referral_first_name,
                    lastName: client_referral_last_name,
                    email: client_referral_email
                }
            };
        }
        case actionTypes.REVIEW_BOARD_REFERRAL_SET_REFERRAL_DETAIL: {
            return {
                ...state,
                referralDetail: {
                    ...state.referralDetail,
                    ...action.data
                }
            };
        }
        case actionTypes.REVIEW_BOARD_REFERRAL_SET_CLIENT_DECISION: {
            const {
                decision,
                decisionReason
            } = action.data;
            return {
                ...state,
                referralDetail: {
                    ...state.referralDetail,
                    ...action.data
                }
            };
        }
        default: {
            return {...state};
        }
    }
};

export default clientReferralReducer;
