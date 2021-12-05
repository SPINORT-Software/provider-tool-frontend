import { combineReducers } from 'redux';

import personalInformationReducer from "./personalInformation";
import visitorLogReducer from "./visitorLog";
import communicationLogReducer from "./communicationLog";

// ===========================|| COMBINE REDUCER ||=========================== //

const clientReducers = combineReducers({
    personalInformation: personalInformationReducer,
    visitorLogs: visitorLogReducer,
    communicationLogs: communicationLogReducer
});

export default clientReducers;
