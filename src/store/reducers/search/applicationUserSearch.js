// action - state management
import * as actionTypes from 'store/actionTypes';

export const initialState = {
    list: [],
    params: {
        user__user_type: "",
        organization: "",
        provider_type: "",
        name: ""
    }
}


const applicationUserSearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_APPLICATION_USER_SEARCH_LIST: {
            const {data} = action;
            return {
                ...state,
                list: [
                    ...data
                ]
            }
        }
        case actionTypes.SET_APPLICATION_USER_SEARCH_PARAMS: {
            const {data} = action;
            return {
                ...state,
                params: {
                    ...state.params,
                    ...data
                }
            }
        }
        default: {
            return {...state};
        }
    }
};

export default applicationUserSearchReducer;

