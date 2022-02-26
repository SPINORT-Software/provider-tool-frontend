import * as actionTypes from 'store/actionTypes';

export const initialState = {
    list: {},
}


const reviewBoardReferralsReducer = (state = initialState, action) => {
    switch (action.type) {
        default: {
            return {...state};
        }
    }
};

export default reviewBoardReferralsReducer;

