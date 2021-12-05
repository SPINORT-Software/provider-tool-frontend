import { combineReducers } from 'redux';

import clientReferralReducer from './clientReferral';

// ===========================|| COMBINE REDUCER ||=========================== //

const reviewBoardReducers = combineReducers({
    personalInformation: clientReferralReducer
});

export default reviewBoardReducers;
