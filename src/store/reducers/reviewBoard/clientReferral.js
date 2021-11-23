// action - state management
import * as actionTypes from 'store/actionTypes';

// export const initialState = {
//     clientDetail: {
//         firstName: '',
//         lastName: '',
//         email: ''
//     },
//     referralDetail: {
//         referralDate: '',
//         discussionDate: '',
//         referralSource: '',
//         referralOrganizations: '',
//         referralOrganizationsDetail: '',
//         membersPresentCaseDiscussion: '',
//         membersPresentCaseDiscussionDetail: '',
//         caseManagementOrganization: '',
//         caseManagementOrganizationDetail: '',
//         decision: '',
//         decisionReason: ''
//     }
// };
export const initialState = {
    list: {},
    add: {
        referralData: {
            client_first_name: '',
            client_last_name: '',
            client_email: '',

            review_board_user: '',
            referral_date: '',

            referral_source: '',
            referral_source_detail: '',

            organizations_upon_referral: [],
            organizations_upon_referral_detail: '',

            date_of_case_discussion: '',

            members_present_case_discussion: [],
            members_present_case_discussion_detail: '',

            case_management_organization_responsible: '',
            case_management_organization_person_responsible: '',
            decision: '',
            decision_detail: '',
        },
        referralForms: {
            emp_referral_request: [],
            familiar_faces_snat: [],
            familiar_faces_sdh: []
        }
    },
    update: {},
    retrieve: {}
}


const clientReferralReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REVIEW_BOARD_REFERRAL_LIST_CLIENT_REFERRALS: {
            const clientReferralsList = action.data
            return {
                ...state,
                list: {
                    ...clientReferralsList
                }
            };
        }
        case actionTypes.REVIEW_BOARD_REFERRAL_SET_CLIENT_DETAIL: {
            const clientDetails = action.data
            return {
                ...state,
                add: {
                    ...state.add,
                    referralData: {
                        ...clientDetails
                    }
                }
            }
        }
        case actionTypes.REVIEW_BOARD_REFERRAL_SET_REFERRAL_DETAIL: {
            const referralDetails = action.data
            return {
                ...state,
                add: {
                    ...state.add,
                    referralData: {
                        ...referralDetails
                    }
                }
            }
        }
        case actionTypes.REVIEW_BOARD_REFERRAL_SET_CLIENT_DECISION: {
            const referralDetails = action.data
            return {
                ...state,
                add: {
                    ...state.add,
                    referralData: {
                        ...referralDetails
                    }
                }
            }
        }
        default: {
            return {...state};
        }
    }
};

export default clientReferralReducer;


// case actionTypes.REVIEW_BOARD_REFERRAL_SET_CLIENT_DETAIL: {
//     // eslint-disable-next-line camelcase
//     const {client_referral_first_name, client_referral_last_name, client_referral_email} = action.data
//     return {
//         ...state,
//         clientDetail: {
//             ...state.clientDetail,
//             firstName: client_referral_first_name,
//             lastName: client_referral_last_name,
//             email: client_referral_email
//         }
//     };
// }
// case actionTypes.REVIEW_BOARD_REFERRAL_SET_REFERRAL_DETAIL: {
//     return {
//         ...state,
//         referralDetail: {
//             ...state.referralDetail,
//             ...action.data
//         }
//     };
// }
// case actionTypes.REVIEW_BOARD_REFERRAL_SET_CLIENT_DECISION: {
//     const {
//         decision,
//         decisionReason
//     } = action.data;
//     return {
//         ...state,
//         referralDetail: {
//             ...state.referralDetail,
//             ...action.data
//         }
//     };
// }