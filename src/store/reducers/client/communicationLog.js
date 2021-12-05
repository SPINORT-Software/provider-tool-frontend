// action - state management
import * as actionTypes from 'store/actionTypes';

export const initialState = {
    add: {
        client: "",
        date: "",
        person_completing: "",
        person_completing_detail: "",
        comments: "",
    },
    list: {}
}


const communicationLogReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLIENT_SET_COMMUNICATION_LOG_DETAIL: {
            const communicationLogData = action.data;
            return {
                ...state,
                add: {
                    ...state.add,
                    ...communicationLogData
                }
            }
        }
        default: {
            return {...state};
        }
    }
};

export default communicationLogReducer;

