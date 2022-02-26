import * as actionTypes from 'store/actionTypes';

export const initialState = {
    list: [],
}


const externalReferralsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DASHBOARD_SET_EXTERNAL_REFERRAL_DATA: {
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

export default externalReferralsReducer;

