import {combineReducers} from 'redux';
import generalNotificationReducer from "./generalNotifications";
import reviewBoardReferralsReducer from "./reviewBoardReferrals";
import internalReferralsReducer from "./internalReferrals";
import externalReferralsReducer from "./externalReferrals";
import internalFollowUpReducer from "./internalFollowUp";
import externalFollowUpReducer from "./externalFollowUp";


const dashboardReducers = combineReducers({
    generalNotifications: generalNotificationReducer,
    reviewBoardReferrals: reviewBoardReferralsReducer,
    internalReferrals: internalReferralsReducer,
    externalReferrals: externalReferralsReducer,
    internalFollowUp: internalFollowUpReducer,
    externalFollowUp: externalFollowUpReducer
})

export default dashboardReducers;