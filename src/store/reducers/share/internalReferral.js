// action - state management
import * as actionTypes from 'store/actionTypes';
import {SHARE_COMMUNICATION_TYPE} from 'store/constant';

export const initialState = {
    from_user: "",
    to_user: "",

    type: SHARE_COMMUNICATION_TYPE.INTERNAL_REFERRAL,

    instance_type: "",
    instance_object: ""
}


const internalReferralReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHARE_SET_INTERNAL_REFERRAL_DATA: {
            const {data} = action;
            return {
                ...state,
                ...data
            }
        }
        default: {
            return {...state};
        }
    }
};

export default internalReferralReducer;
