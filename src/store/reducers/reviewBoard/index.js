import { combineReducers } from 'redux';

import clientReferralReducer from './clientReferral';

// ===========================|| COMBINE REDUCER ||=========================== //

const reviewBoardReducers = combineReducers({
    referralActivity: clientReferralReducer
});

export default reviewBoardReducers;
