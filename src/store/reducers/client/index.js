import { combineReducers } from 'redux';

import personalInformationReducer from "./personalInformation";
import clinicalInformationReducer from "./clinicalInformation";
import visitorLogReducer from "./visitorLog";
import communicationLogReducer from "./communicationLog";

// ===========================|| COMBINE REDUCER ||=========================== //

const clientReducers = combineReducers({
    personalInformation: personalInformationReducer,
    clinicalInformation: clinicalInformationReducer,
    visitorLogs: visitorLogReducer,
    communicationLogs: communicationLogReducer
});

export default clientReducers;
