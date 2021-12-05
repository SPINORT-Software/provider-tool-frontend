// action - state management
import * as actionTypes from 'store/actionTypes';
import {CLIENT_SET_PERSONAL_INFORMATION_DETAIL, CLIENT_SET_VISITOR_LOG_DETAIL} from "store/actionTypes";

export const initialState = {
    add: {
        client: "",
        date: "",
        visit_reason: "",
        organization: []
    },
    list: {}
}


const visitorLogReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLIENT_SET_VISITOR_LOG_DETAIL: {
            const visitorLogData = action.data;
            return {
                ...state,
                add: {
                    ...state.add,
                    ...visitorLogData
                }
            }
        }
        default: {
            return {...state};
        }
    }
};

export default visitorLogReducer;

