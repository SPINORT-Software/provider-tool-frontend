import * as actionTypes from 'store/actionTypes';

export const initialState = {
    list: {},
}


const generalNotificationReducer = (state = initialState, action) => {
    switch (action.type) {
        default: {
            return {...state};
        }
    }
};

export default generalNotificationReducer;

