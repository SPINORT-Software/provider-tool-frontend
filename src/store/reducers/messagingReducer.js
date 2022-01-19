// action - state management
import * as actionTypes from '../actionTypes';

const initialState = {
    activeChats: {},
    archivedChats: {},
    searchList: {
        selected: {},
        list: []
    },
    selectedRecipient: {},
};

// ===========================|| SNACKBAR REDUCER ||=========================== //

const messagingReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MESSAGING_ADD_NEW_MESSAGE: {
            const {recipientUsername, message} = action.data;
            return {
                ...state,
                activeChats: {
                    ...state.activeChats,
                    [recipientUsername]: {
                        ...state.activeChats[recipientUsername],
                        ...message
                    }
                }
            };
        }
        case actionTypes.MESSAGING_SET_SEARCH_USERS_LIST: {
            const usersList = action.data;

            return {
                ...state,
                searchList: {
                    ...state.searchList,
                    list: usersList
                }
            }
        }
        case actionTypes.MESSAGING_SET_SEARCH_USERS_LIST_SELECTED: {
            const searchSelectedUser = action.data;
            const {username} = searchSelectedUser;

            return {
                ...state,
                searchList: {
                    ...state.searchList,
                    selected: searchSelectedUser
                },
                activeChats: {
                    ...state.activeChats,
                    [username]: {
                        user: searchSelectedUser,
                        messages: []
                    }
                }
            }
        }
        case actionTypes.MESSAGING_SET_ACTIVE_RECIPIENT_USER: {
            const searchSelectedUser = action.data;
            return {
                ...state,
                selectedRecipient: searchSelectedUser
            }
        }
        case actionTypes.MESSAGING_SET_ACTIVE_RECIPIENT_HISTORY: {
            const {history, recipientUsername} = action.data;

            return {
                ...state,
                activeChats: {
                    ...state.activeChats,
                    [recipientUsername]: [
                        history
                    ]
                }
            }
        }
        case actionTypes.MESSAGING_ADD_NEW_MESSAGE_SEND: {
            const {message, recipientUsername} = action.data

            console.log(recipientUsername)
            console.log(message)
            console.log(state.activeChats)

            const recipientObject = {
                [recipientUsername]: {
                    ...state.activeChats[recipientUsername],
                    messages: [
                        ...state.activeChats[recipientUsername].messages,
                        message
                    ]
                }
            }

            return {
                ...state,
                activeChats: {
                    ...state.activeChats,
                    ...recipientObject
                }
            }
        }
        default:
            return state;
    }
};

export default messagingReducer;
