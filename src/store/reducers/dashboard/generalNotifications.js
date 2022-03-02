import * as actionTypes from 'store/actionTypes';
import {DASHBOARD_SET_ALL_ACTIVITY_NOTIFICATIONS_DATA} from "store/actionTypes";


export const initialState = {
    list_dashboard: [],
    list_all: [],
}


const generalNotificationReducer = (state = initialState, action) => {
    switch (action.type) {
        default: {
            return {...state};
        }

        case actionTypes.DASHBOARD_SET_ACTIVITY_NOTIFICATIONS_DATA: {
            const {data} = action
            return {
                ...state,
                list_dashboard: [
                    ...data
                ]
            };
        }

        case actionTypes.DASHBOARD_SET_ALL_ACTIVITY_NOTIFICATIONS_DATA: {
            return {...state};
        }
    }
};

export default generalNotificationReducer;

