import * as actionTypes from 'store/actionTypes';


export const initialState = {
    list: {},
    add: {
        intervention: {
            casemanager: false,
            client: false,
            date: new Date(),
            total_time: "",
            mode_of_clinical_intervention: "",
            therapeutic_type: "",
            clinical_type: []
        },
        forms: {
            progress_notes: []
        }
    },
    update: {},
    retrieve: {}
}


const clientInterventionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CASE_MANAGER_SET_CLIENT_INTERVENTION_DETAILS: {
            const interventionData = action.data

            return {
                ...state,
                add: {
                    ...state.add,
                    intervention: {
                        ...state.add.intervention,
                        ...interventionData
                    }
                }
            };
        }
        case actionTypes.CASE_MANAGER_SET_CLIENT_INTERVENTION_CASEMANAGER_DETAIL: {
            const caseManagerUUID = action.data;

            return {
                ...state,
                add: {
                    ...state.add,
                    intervention: {
                        ...state.add.intervention,
                        casemanager: caseManagerUUID
                    }
                }
            }
        }
        case actionTypes.CASE_MANAGER_SET_CLIENT_INTERVENTION_DATE_ADD: {
            const clientInterventionDate = action.data;

            return {
                ...state,
                add: {
                    ...state.add,
                    intervention: {
                        ...state.add.intervention,
                        date: clientInterventionDate
                    }
                }
            }
        }


        default: {
            return {...state};
        }
    }
};

export default clientInterventionReducer;

