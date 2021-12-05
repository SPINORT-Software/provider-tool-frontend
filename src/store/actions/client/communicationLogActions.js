import * as actionTypes from 'store/actionTypes';

const setCommunicationLogDetail = (values) => ({
    type: actionTypes.CLIENT_SET_COMMUNICATION_LOG_DETAIL,
    data: {
        ...values
    }
});

export default setCommunicationLogDetail