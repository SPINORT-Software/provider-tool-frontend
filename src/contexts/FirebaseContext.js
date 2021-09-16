import PropTypes from 'prop-types';
import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import firebase from 'firebase/app';
import 'firebase/auth';

// action - state management
import { ACCOUNT_INITIALIZE } from 'store/actions';

// project imports
import accountReducer from 'store/accountReducer';
import Loader from 'ui-component/Loader';
import config from 'config';

// firebase initialize
if (!firebase.apps.length) {
    firebase.initializeApp(config.firebase);
}

// const
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

// ===========================|| FIREBASE CONTEXT & PROVIDER ||=========================== //

const FirebaseContext = createContext({
    ...initialState,
    firebaseEmailPasswordNewUser: () => Promise.resolve(),
    firebaseEmailPasswordSignIn: () => Promise.resolve(),
    firebaseGoogleSignIn: () => Promise.resolve(),
    logout: () => Promise.resolve()
});

export const FirebaseProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    const firebaseEmailPasswordSignIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

    const firebaseGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        return firebase.auth().signInWithPopup(provider);
    };

    const firebaseEmailPasswordNewUser = async (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

    const logout = () => firebase.auth().signOut();

    useEffect(
        () =>
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    dispatch({
                        type: ACCOUNT_INITIALIZE,
                        payload: {
                            isLoggedIn: true,
                            user: {
                                id: user.uid,
                                email: user.email
                            }
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
            }),
        [dispatch]
    );

    if (!state.isInitialized) {
        return <Loader />;
    }

    return (
        <FirebaseContext.Provider
            value={{
                ...state,
                firebaseEmailPasswordNewUser,
                firebaseEmailPasswordSignIn,
                firebaseGoogleSignIn,
                logout
            }}
        >
            {children}
        </FirebaseContext.Provider>
    );
};

FirebaseProvider.propTypes = {
    children: PropTypes.node
};

export default FirebaseContext;
