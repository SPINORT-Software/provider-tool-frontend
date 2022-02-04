import * as actionTypes from 'store/actionTypes';
import {CLINICIAN_SET_DAILY_WORKLOAD_DETAILS} from "store/actionTypes";

export const initialState = {
    list: {},
    add: {
        daily_workload_date: new Date(),
        service_recipient_travel: "",
        functional_center: "",

        client_caseload_casemanagement_number_clients: "",
        client_caseload_casemanagement_total_time: "",
        client_caseload_regular_number_clients: "",
        client_caseload_regular_total_time: "",

        clinician: ""
    },
    retrieve: {}
}


const dailyWorkloadReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLINICIAN_SET_DAILY_WORKLOAD_DETAILS: {
            const workloadData = action.data
            return {
                ...state,
                add: {
                    ...state.add,
                    ...workloadData
                }
            };
        }
        case actionTypes.CLINICIAN_LIST_DAILY_WORKLOAD: {
            const workloadList = action.data
            return {
                ...state,
                list: {
                    ...workloadList
                }
            };
        }
        case actionTypes.CLINICIAN_RESET_DAILY_WORKLOAD_DETAILS: {
            return {
                ...state,
                add: {
                    daily_workload_date: new Date(),
                    service_recipient_travel: "",
                    functional_center: "",

                    client_caseload_casemanagement_number_clients: "",
                    client_caseload_casemanagement_total_time: "",
                    client_caseload_regular_number_clients: "",
                    client_caseload_regular_total_time: "",
                }
            }
        }
        case actionTypes.CLINICIAN_RETRIEVE_DAILY_WORKLOAD: {
            const {workloadID, workloadData} = action.data;
            return {
                ...state,
                retrieve: {
                    ...state.retrieve,
                    [workloadID]: {
                        ...workloadData
                    }
                }
            }
        }
        case actionTypes.CLINICIAN_SET_RETRIEVED_DAILY_WORKLOAD_DETAILS_UPDATE: {
            const workloadData = action.data
            return {
                ...state,
                add: {
                    ...state.add,
                    ...workloadData
                }
            };
        }
        case actionTypes.CLINICIAN_SET_ADD_DAILY_WORKLOAD_DATE: {
            const workloadDate = action.data;
            return {
                ...state,
                add: {
                    ...state.add,
                    daily_workload_date: workloadDate
                }
            }
        }
        default: {
            return {...state};
        }
    }
};

export default dailyWorkloadReducer;

