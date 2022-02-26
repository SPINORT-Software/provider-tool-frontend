import {combineReducers} from 'redux';

import ClientInterventionReducer from './clientIntervention';

// ===========================|| COMBINE REDUCER ||=========================== //

const externalPartnerReducers = combineReducers({
    clientIntervention: ClientInterventionReducer
});

export default externalPartnerReducers;
