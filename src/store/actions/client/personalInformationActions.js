import * as actionTypes from 'store/actionTypes';

export const setPersonalInformationDetails = (values) => ({
    type: actionTypes.CLIENT_SET_PERSONAL_INFORMATION_DETAIL,
    data: {
        ...values
    }
});

export const setHomeSafetyAssessmentDetails = (values) => ({
    type: actionTypes.CLIENT_SET_HOME_SAFETY_ASSESSMENT_DETAIL,
    data: {
        ...values
    }
});

export const setRetrievedClientPersonalInformationData = (values) => ({
    type: actionTypes.CLIENT_SET_RETRIEVED_PERSONAL_INFORMATION_DATA,
    data: {
        ...values
    }
})



