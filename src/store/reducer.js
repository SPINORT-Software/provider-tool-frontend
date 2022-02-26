import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// reducer import
import customizationReducer from './reducers/customizationReducer';
import snackbarReducer from './reducers/snackbarReducer';
import cartReducer from './reducers/cartReducer';
import sectionFormReducer from './reducers/sectionFormReducer';
import accountReducer from './reducers/accountReducer';
import reviewBoardReducers from './reducers/reviewBoard';
import caseManagerReducers from './reducers/caseManager';
import clinicianReducers from './reducers/clinician';
import messagingReducer from './reducers/messagingReducer';
import clientReducers from './reducers/client';
import externalPartnerReducers from './reducers/externalPartner';
import dashboardReducers from "./reducers/dashboard";
import searchReducers from "./reducers/search";
import shareReducers from "./reducers/share";

// ===========================|| COMBINE REDUCER ||=========================== //

const reducer = combineReducers({
    customization: customizationReducer,
    snackbar: snackbarReducer,
    sectionForm: sectionFormReducer,
    account: accountReducer,
    reviewBoard: reviewBoardReducers,
    caseManager: caseManagerReducers,
    clinician: clinicianReducers,
    messaging: messagingReducer,
    client: clientReducers,
    externalPartner: externalPartnerReducers,
    dashboard: dashboardReducers,
    search: searchReducers,
    share: shareReducers,
    cart: persistReducer(
        {
            key: 'cart',
            storage,
            keyPrefix: 'ccc-'
        },
        cartReducer
    )
});

export default reducer;
