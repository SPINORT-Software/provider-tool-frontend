import {combineReducers} from 'redux';

import dailyWorkloadReducer from './dailyWorkload';
import clientAssessmentReducer from './clientAssessment';
import ClientInterventionReducer from './clientIntervention';

// ===========================|| COMBINE REDUCER ||=========================== //

const caseManagerReducers = combineReducers({
    dailyWorkload: dailyWorkloadReducer,
    clientAssessment: clientAssessmentReducer,
    clientIntervention: ClientInterventionReducer
});

export default caseManagerReducers;
