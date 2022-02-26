import {combineReducers} from 'redux';

import applicationUserSearchReducer from "./applicationUserSearch";

// ===========================|| COMBINE REDUCER ||=========================== //

const searchReducers = combineReducers({
    applicationUser: applicationUserSearchReducer,
});

export default searchReducers;
