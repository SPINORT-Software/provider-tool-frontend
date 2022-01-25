import * as actionTypes from 'store/actionTypes';

export const setClinicalInformationDetails = (values) => ({
    type: actionTypes.CLIENT_SET_CLINICAL_INFORMATION_DETAIL,
    data: {
        ...values
    }
});

export const setRetrievedClientClinicalInformationData = (values) => ({
    type: actionTypes.CLIENT_SET_RETRIEVED_CLINICAL_INFORMATION_DATA,
    data: {
        ...values
    }
})



