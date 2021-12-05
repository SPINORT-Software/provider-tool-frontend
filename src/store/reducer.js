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
import messagingReducer from './reducers/messagingReducer';
import clientReducers from './reducers/client';


// ===========================|| COMBINE REDUCER ||=========================== //

const reducer = combineReducers({
    customization: customizationReducer,
    snackbar: snackbarReducer,
    sectionForm: sectionFormReducer,
    account: accountReducer,
    reviewBoard: reviewBoardReducers,
    caseManager: caseManagerReducers,
    messaging: messagingReducer,
    client: clientReducers,
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
