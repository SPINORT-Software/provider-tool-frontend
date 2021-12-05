import * as actionTypes from 'store/actionTypes';

const setPersonalInformationDetails = (values) => ({
    type: actionTypes.CLIENT_SET_PERSONAL_INFORMATION_DETAIL,
    data: {
        ...values
    }
});

export default setPersonalInformationDetails