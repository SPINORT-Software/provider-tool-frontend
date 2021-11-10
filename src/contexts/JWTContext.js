import PropTypes from 'prop-types';
import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import jwtDecode from 'jwt-decode';

// reducer - state management
import { ACCOUNT_INITIALIZE, LOGIN, LOGOUT } from 'store/actionTypes';
import accountReducer from 'store/reducers/accountReducer';

// project imports
import axios from 'utils/axios';
import Loader from 'ui-component/Loader';

// constant
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

const verifyToken = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    const decoded = jwtDecode(serviceToken);
    return decoded.exp > Date.now() / 36000;
};

const setSession = (serviceToken) => {
    if (serviceToken) {
        localStorage.setItem('serviceToken', serviceToken);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        localStorage.removeItem('serviceToken');
        delete axios.defaults.headers.common.Authorization;
    }
};

// ===========================|| JWT CONTEXT & PROVIDER ||=========================== //

const JWTContext = createContext({
    ...initialState,
    login: () => Promise.resolve(),
    logout: () => {
    }
});

export const JWTProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    const login = async (email, password) => {
        const rawResponse = await fetch('http://127.0.0.1:8000/token-auth/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: 'schitta', password: 'Password123!@#' })
        });
        const { token, user } = await rawResponse.json();

        console.log("Login --- ")
        console.log(token, user)

        setSession(token);
        dispatch({
            type: LOGIN,
            payload: {
                user
            }
        });
    };

    const logout = () => {
        console.log("Logout - 76")
        setSession(null);
        dispatch({ type: LOGOUT });
    };

    useEffect(() => {
        const init = async () => {
            try {
                const serviceToken = window.localStorage.getItem('serviceToken');
                if (serviceToken && verifyToken(serviceToken)) {
                    setSession(serviceToken);

                    const rawResponse = await fetch('http://127.0.0.1:8000/core/current_user/', {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `jwt ${serviceToken}`
                        }
                    });
                    const user = await rawResponse.json();

                    dispatch({
                        type: ACCOUNT_INITIALIZE,
                        payload: {
                            isLoggedIn: true,
                            user
                        }
                    });
                } else {
                    dispatch({
                        type: ACCOUNT_INITIALIZE,
                        payload: {
                            isLoggedIn: false,
                            user: null
                        }
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: ACCOUNT_INITIALIZE,
                    payload: {
                        isLoggedIn: false,
                        user: null
                    }
                });
            }
        };

        init();
    }, []);

    if (!state.isInitialized) {
        return <Loader />;
    }

    return <JWTContext.Provider value={{ ...state, login, logout }}>{children}</JWTContext.Provider>;
};

JWTProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default JWTContext;
