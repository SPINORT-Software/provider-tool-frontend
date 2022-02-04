import * as actionTypes from 'store/actionTypes';

export const setDailyWorkLoadDetails = (values) => ({
    type: actionTypes.CLINICIAN_SET_DAILY_WORKLOAD_DETAILS,
    data: {
        ...values
    }
});

export const setAddDailyWorkLoadDate = (date) => ({
    type: actionTypes.CLINICIAN_SET_ADD_DAILY_WORKLOAD_DATE,
    data: date
});

export const setRetrievedDailyWorkLoadDetailsUpdate = (values) => ({
    type: actionTypes.CLINICIAN_SET_RETRIEVED_DAILY_WORKLOAD_DETAILS_UPDATE,
    data: {
        ...values
    }
});

export const listDailyWorkLoad = (responseData) => ({
    type: actionTypes.CLINICIAN_LIST_DAILY_WORKLOAD,
    data: {
        ...responseData
    }
})

export const resetDailyWorkLoad = () => ({
    type: actionTypes.CLINICIAN_RESET_DAILY_WORKLOAD_DETAILS,
    data: false
})

export const retrieveDailyWorkload = (workloadID, workloadData) => ({
    type: actionTypes.CLINICIAN_RETRIEVE_DAILY_WORKLOAD,
    data: {
        workloadID,
        workloadData
    }
})

