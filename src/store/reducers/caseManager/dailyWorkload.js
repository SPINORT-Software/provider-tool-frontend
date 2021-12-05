import * as actionTypes from 'store/actionTypes';

export const initialState = {
    list: {},
    add: {
        daily_workload_date: "",
        service_recipient_travel: "",
        functional_center: "",

        client_caseload_casemanagement_number_clients: "",
        client_caseload_casemanagement_total_time: "",
        client_caseload_regular_number_clients: "",
        client_caseload_regular_total_time: "",

        project_case_management_total_time: "",
        project_case_management_admin_total_time: "",
        project_case_management_admin_other: "",

        research_related_meetings_total_time: "",
        research_related_administration_total_time: "",
        research_related_other: "",

        casemanager: ""
    },
    update: {},
    retrieve: {}
}


const dailyWorkloadReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CASE_MANAGER_SET_DAILY_WORKLOAD_DETAILS: {
            const workloadData = action.data
            return {
                ...state,
                add: {
                    ...state.add,
                    ...workloadData
                }
            };
        }
        case actionTypes.CASE_MANAGER_LIST_DAILY_WORKLOAD: {
            const workloadList = action.data
            return {
                ...state,
                list: {
                    ...workloadList
                }
            };
        }
        case actionTypes.CASE_MANAGER_RESET_DAILY_WORKLOAD_DETAILS: {
            return {
                ...state,
                add: {
                    daily_workload_date: "",
                    service_recipient_travel: "",
                    functional_center: "",

                    client_caseload_casemanagement_number_clients: "",
                    client_caseload_casemanagement_total_time: "",
                    client_caseload_regular_number_clients: "",
                    client_caseload_regular_total_time: "",

                    project_case_management_total_time: "",
                    project_case_management_admin_total_time: "",
                    project_case_management_admin_other: "",

                    research_related_meetings_total_time: "",
                    research_related_administration_total_time: "",
                    research_related_other: "",
                }
            }
        }
        default: {
            return {...state};
        }
    }
};

export default dailyWorkloadReducer;

