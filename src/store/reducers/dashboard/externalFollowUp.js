import * as actionTypes from 'store/actionTypes';

export const initialState = {
    list: [],
}


const externalFollowUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DASHBOARD_SET_EXTERNAL_FOLLOWUP_DATA: {
            const {data} = action;
            return {
                ...state,
                list: [
                    ...data
                ]
            }
        }
        default: {
            return {...state};
        }
    }
};

export default externalFollowUpReducer;

