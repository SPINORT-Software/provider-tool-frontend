// action - state management
import { ACCOUNT_INITIALIZE, LOGIN, LOGOUT } from '../actionTypes';

// ===========================|| ACCOUNT REDUCER ||=========================== //
const accountReducer = (state, action) => {
    switch (action.type) {
        case ACCOUNT_INITIALIZE: {
            const { isLoggedIn, user, ws, ns } = action.payload;
            return {
                ...state,
                isLoggedIn,
                isInitialized: true,
                user,
                ws,
                ns
            };
        }
        case LOGIN: {
            const { user, ws, ns } = action.payload;
            return {
                ...state,
                isLoggedIn: true,
                user,
                ws,
                ns
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
