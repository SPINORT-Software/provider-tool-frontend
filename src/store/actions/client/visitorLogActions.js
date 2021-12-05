import * as actionTypes from 'store/actionTypes';

const setVisitorLogDetail = (values) => ({
    type: actionTypes.CLIENT_SET_VISITOR_LOG_DETAIL,
    data: {
        ...values
    }
});

export default setVisitorLogDetail