import { combineReducers } from 'redux';

import clientReferralReducer from './clientReferral';

// ===========================|| COMBINE REDUCER ||=========================== //

const reviewBoardReducers = combineReducers({
    referrals: clientReferralReducer
});

export default reviewBoardReducers;
