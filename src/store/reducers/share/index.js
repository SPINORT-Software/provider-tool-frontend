import {combineReducers} from 'redux';

import internalReferralReducer from "./internalReferral";
import externalReferralReducer from "./externalReferral";
import internalFollowUpReducer from "./internalFollowUp";
import externalFollowUpReducer from "./externalFollowUp";

// ===========================|| COMBINE REDUCER ||=========================== //

const shareReducers = combineReducers({
    internalReferral: internalReferralReducer,
    externalReferral: externalReferralReducer,
    internalFollowup: internalFollowUpReducer,
    externalFollowup: externalFollowUpReducer
});

export default shareReducers;
