import * as actionTypes from 'store/actionTypes';
import {CASE_MANAGER_LIST_DAILY_WORKLOAD, CASE_MANAGER_SET_DAILY_WORKLOAD_DETAILS} from "store/actionTypes";

export const setDailyWorkLoadDetails = (values) => ({
    type: actionTypes.CASE_MANAGER_SET_DAILY_WORKLOAD_DETAILS,
    data: {
        ...values
    }
});

export const listDailyWorkLoad = (responseData) => ({
    type: actionTypes.CASE_MANAGER_LIST_DAILY_WORKLOAD,
    data: {
        ...responseData
    }
})

export const resetDailyWorkLoad = () => ({
    type: actionTypes.CASE_MANAGER_RESET_DAILY_WORKLOAD_DETAILS,
    data: false
})



