import * as actionTypes from 'store/actionTypes';

export const initialState = {
    list: [],
}


const internalReferralsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DASHBOARD_SET_INTERNAL_REFERRAL_DATA: {
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

export default internalReferralsReducer;

