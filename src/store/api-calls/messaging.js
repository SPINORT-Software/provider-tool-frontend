import axios from './axios-client';

export default {
    async getMessagesHistory(senderUsername, recipientUsername) {
        try {
            const response = await axios.get('messaging/history', {
                sender: senderUsername,
                recipient: recipientUsername
            });
            return response.data;
        } catch (error) {
            return error.response;
        }
    },

    async getUserActiveRecipientsList(username) {
        try {
            const response = await axios.get('messaging/active_chats', {
                user: username
            });
            return response.data;
        } catch (error) {
            return error.response;
        }
    },
}



