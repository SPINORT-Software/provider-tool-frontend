import {combineReducers} from 'redux';

import internalReferralReducer from "./internalReferral";
import externalReferralReducer from "./externalReferral";

// ===========================|| COMBINE REDUCER ||=========================== //

const shareReducers = combineReducers({
    internalReferral: internalReferralReducer,
    externalReferral: externalReferralReducer
});

export default shareReducers;
