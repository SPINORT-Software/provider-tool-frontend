import * as actionTypes from 'store/actionTypes';
import {MESSAGING_SET_ACTIVE_RECIPIENT_USER, MESSAGING_SET_SEARCH_USERS_LIST_SELECTED} from "store/actionTypes";

export const setNewMessage = (values) => ({
    type: actionTypes.MESSAGING_ADD_NEW_MESSAGE,
    data: {
        ...values
    }
});

export const setSearchUsersList = (values) => ({
    type: actionTypes.MESSAGING_SET_SEARCH_USERS_LIST,
    data: {
        ...values
    }
});

export const setSearchUsersListSelected = (selectedUser) => ({
    type: actionTypes.MESSAGING_SET_SEARCH_USERS_LIST_SELECTED,
    data: selectedUser
});

export const setUserActiveMessagesList = (values) => ({
    type: actionTypes.MESSAGING_SET_ACTIVE_MESSAGES_LIST,
    data: {
        ...values
    }
});

export const setActiveRecipientUser = (selectedUser) => ({
    type: actionTypes.MESSAGING_SET_ACTIVE_RECIPIENT_USER,
    data: selectedUser
});

export const setActiveRecipientMessageHistory = (history, recipientUsername) => ({
    type: actionTypes.MESSAGING_SET_ACTIVE_RECIPIENT_HISTORY,
    data: {
        history,
        recipientUsername
    }
});


export const setNewMessageSend = (message, recipientUsername) => ({
    type: actionTypes.MESSAGING_ADD_NEW_MESSAGE_SEND,
    data: {
        message,
        recipientUsername
    }
});



