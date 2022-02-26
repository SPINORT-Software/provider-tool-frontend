import * as actionTypes from 'store/actionTypes';
import {EXTERNAL_PARTNER_LIST_CLIENT_INTERVENTION_FOR_EXTERNAL_PARTNER} from "store/actionTypes";


export const initialState = {
    list: {},
    add: {
        casemanager: false,
        client: false,
        assessment_status: "",
        intervention_date: "",
        internal_comm_assessment_clinical_notes: "",
        internal_comm_followup_clinical_notes: "",
        internal_comm_internal_referral_notes: "",

        forms: []
    },
    retrieve: {}
}


const clientInterventionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EXTERNAL_PARTNER_LIST_CLIENT_INTERVENTION_FOR_EXTERNAL_PARTNER: {
            const clientInterventionlistData = action.data;

            return {
                ...state,
                list: {
                    ...state.list,
                    ...clientInterventionlistData
                }
            }
        }
        default: {
            return {...state};
        }
    }
};

export default clientInterventionReducer;

