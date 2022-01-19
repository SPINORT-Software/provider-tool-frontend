import PropTypes from 'prop-types';
import React, {createContext, useEffect, useReducer} from 'react';

// reducer - state management
import {ACCOUNT_INITIALIZE, LOGIN, LOGOUT} from 'store/actionTypes';
import accountReducer from 'store/reducers/accountReducer';

import Loader from 'ui-component/Loader';

import {useNavigate} from 'react-router-dom';
import {w3cwebsocket as W3CWebSocket} from "websocket/lib/websocket";
import JWTContext from "./JWTContext";

// constant
const initialState = {
    wsChat: null,
    wsNotifications: null
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

const SocketContext = createContext({
    ...initialState
});

export const SocketProvider = ({children}) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);
    const navigate = useNavigate();
    const jwtContext = React.useContext(JWTContext);
    console.log(jwtContext)

    useEffect(() => {
        console.log("=")
    }, []);

    return <SocketContext.Provider value={{...state}}>{children}</SocketContext.Provider>;
};

SocketProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default SocketContext;
