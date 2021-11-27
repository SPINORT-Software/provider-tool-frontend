import {combineReducers} from 'redux';

import dailyWorkloadReducer from './dailyWorkload';
import clientAssessmentReducer from './clientAssessment';

// ===========================|| COMBINE REDUCER ||=========================== //

const caseManagerReducers = combineReducers({
    dailyWorkload: dailyWorkloadReducer,
    clientAssessment: clientAssessmentReducer
});

export default caseManagerReducers;
