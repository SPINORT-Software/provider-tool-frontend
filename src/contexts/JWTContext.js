import PropTypes from 'prop-types';
import React, {createContext, useEffect, useReducer} from 'react';

// third-party
import jwtDecode from 'jwt-decode';

// reducer - state management
import {ACCOUNT_INITIALIZE, LOGIN, LOGOUT} from 'store/actionTypes';
import accountReducer from 'store/reducers/accountReducer';

// project imports
// import axios from 'utils/axios';
import axios from 'store/api-calls/axios-client';
import Loader from 'ui-component/Loader';

import {useNavigate} from 'react-router-dom';
import {w3cwebsocket as W3CWebSocket} from "websocket/lib/websocket";
import {setNewMessageSend} from "../store/actions/messagingActions";

// constant
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null,
    ws: null
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
        axios.defaults.headers.common.Authorization = `Token ${serviceToken}`;
    } else {
        localStorage.removeItem('serviceToken');
        delete axios.defaults.headers.common.Authorization;
    }
};

const check = (ws, user) => {
    // eslint-disable-next-line no-use-before-define
    if (!ws || ws.readyState === WebSocket.CLOSED) setWSClient(user);
};

const setWSClient = (user) => {
    const {token} = user;

    const socketChatClient = new W3CWebSocket(`ws://127.0.0.1:8000/ws/chat/?t=${token}`);
    // let timeout = 0;
    let connectInterval;

    // websocket onopen event listener
    socketChatClient.onopen = () => {
        console.log("Connected")
        // timeout = 250;
        // clearTimeout(connectInterval);
    };

    // websocket onclose event listener
    socketChatClient.onclose = e => {
        // timeout += timeout;
        // connectInterval = setTimeout(() => check(socketChatClient, user), Math.min(10000, timeout));
    };

    // websocket onerror event listener
    socketChatClient.onerror = err => {
        socketChatClient.close();
    };

    return socketChatClient;
}

const JWTContext = createContext({
    ...initialState,
    login: () => Promise.resolve(),
    logout: () => {
    }
});

export const JWTProvider = ({children}) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);
    const navigate = useNavigate();

    const login = async (email, password) => {
        const rawResponse = await fetch(`${process.env.REACT_APP_DJANGO_SERVER_API}/auth/users/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: {email, password}})
        });
        const {user} = await rawResponse.json();
        const {token} = user
        const ws = setWSClient(user)

        setSession(token);
        dispatch({
            type: LOGIN,
            payload: {
                user,
                ws
            }
        });
    };

    const logout = () => {
        setSession(null);
        dispatch({type: LOGOUT});
        navigate('login', {replace: true});
    };

    useEffect(() => {
        const init = async () => {
            try {
                const serviceToken = window.localStorage.getItem('serviceToken');

                if (serviceToken && verifyToken(serviceToken)) {
                    setSession(serviceToken);

                    const rawResponse = await fetch(`${process.env.REACT_APP_DJANGO_SERVER_API}/auth/user/profile`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${serviceToken}`
                        }
                    });
                    const user = await rawResponse.json();

                    const {token} = user;
                    const socketChatClient = new WebSocket(`wss://${process.env.REACT_APP_DJANGO_WS}/ws/chat/?t=${token}`);
                    const socketNotificationClient = new WebSocket(`wss://${process.env.REACT_APP_DJANGO_WS}/ws/notifications/?t=${token}`);

                    socketNotificationClient.onmessage = (e) => {
                        const notificationData = JSON.parse(e.data)
                        console.log(notificationData)
                    }

                    // websocket onopen event listener
                    socketChatClient.onopen = () => {

                        // console.log("Connected")
                    };

                    socketChatClient.onclose = e => {
                        // console.log("Disconnected1")
                    };

                    // websocket onerror event listener
                    socketChatClient.onerror = err => {
                        // socketChatClient.close();
                    };

                    dispatch({
                        type: ACCOUNT_INITIALIZE,
                        payload: {
                            isLoggedIn: true,
                            user,
                            ws: socketChatClient,
                            ns: socketNotificationClient
                        }
                    });
                } else {
                    dispatch({
                        type: ACCOUNT_INITIALIZE,
                        payload: {
                            isLoggedIn: false,
                            user: null,
                            ws: null
                        }
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: ACCOUNT_INITIALIZE,
                    payload: {
                        isLoggedIn: false,
                        user: null,
                        ws: null
                    }
                });
            }
        };

        init();
    }, []);

    if (!state.isInitialized) {
        return <Loader/>;
    }

    return <JWTContext.Provider value={{...state, login, logout}}>{children}</JWTContext.Provider>;
};

JWTProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default JWTContext;
