// action - state management
import * as actionTypes from 'store/actionTypes';

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
            decision: 'POTENTIAL_CLIENT',
            decision_detail: '',
        },
        referralForms: {
            emp_referral_request: [],
            familiar_faces_snat: [],
            familiar_faces_sdh: [],
            case_presentation: []
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
        case actionTypes.REVIEW_BOARD_REFERRAL_SET_FORM_FILE_EMP_REFERRAL_REQUEST: {
            const documentUUID = action.data;
            return {
                ...state,
                add: {
                    ...state.add,
                    referralForms: {
                        ...state.add.referralForms,
                        emp_referral_request: [documentUUID]
                    }
                }
            }
        }
        case actionTypes.REVIEW_BOARD_REFERRAL_SET_FORM_FILE_FAMILIAR_FACES_SNAT: {
            const documentUUID = action.data;
            return {
                ...state,
                add: {
                    ...state.add,
                    referralForms: {
                        ...state.add.referralForms,
                        familiar_faces_snat: [documentUUID]
                    }
                }
            }
        }
        case actionTypes.REVIEW_BOARD_REFERRAL_SET_FORM_FILE_FAMILIAR_FACES_FACES_SDH: {
            const documentUUID = action.data;
            return {
                ...state,
                add: {
                    ...state.add,
                    referralForms: {
                        ...state.add.referralForms,
                        familiar_faces_sdh: [documentUUID]
                    }
                }
            }
        }
        case actionTypes.REVIEW_BOARD_REFERRAL_SET_FORM_FILE_CASE_PRESENTATION: {
            const documentUUID = action.data;
            return {
                ...state,
                add: {
                    ...state.add,
                    referralForms: {
                        ...state.add.referralForms,
                        case_presentation: [documentUUID]
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