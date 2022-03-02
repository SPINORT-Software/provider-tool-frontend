import {NOTIFICATION_OBJECT_TYPE} from "store/constant";

const messageActionParse = {
    "CREATED": "has added a new",
    "UPDATED": "has updated the"
}

export default {
    prepareDashboardMessage(data) {
        const {
            type: action_type, otype: object_type_display, otype_code: object_type_code, by: {
                user: {
                    fullname: notification_sender_name
                }
            }
        } = data;

        const action_parsed = messageActionParse[action_type]
        return `${notification_sender_name} ${action_parsed} ${object_type_display.toLowerCase().trim()}`
    }
}