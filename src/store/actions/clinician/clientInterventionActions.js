import * as actionTypes from 'store/actionTypes';

export const setInterventionClientDetail = (clientUUID) => ({
    type: actionTypes.CLINICIAN_SET_CLIENT_INTERVENTION_CLIENT_DETAIL,
    data: clientUUID
});

export const setInterventionCaseManagerDetail = (clinicianUUID) => ({
    type: actionTypes.CLINICIAN_SET_CLIENT_INTERVENTION_CLINICIAN_DETAIL,
    data: clinicianUUID
});

export const setInterventionDateAdd = (date) => ({
    type: actionTypes.CLINICIAN_SET_CLIENT_INTERVENTION_DATE_ADD,
    data: date
});

export const setInterventionFormDetails = (values) => ({
    type: actionTypes.CLINICIAN_SET_CLIENT_INTERVENTION_DETAILS,
    data: {
        ...values
    }
});

export const setInterventionFormUUID = (formDocumentUUID) => ({
    type: actionTypes.CLINICIAN_SET_CLIENT_INTERVENTION_FORM_UUID,
    data: formDocumentUUID
});


export const listClinicianClientInterventions = (responseData) => ({
    type: actionTypes.CLINICIAN_LIST_CLIENT_INTERVENTION_FOR_CLINICIAN,
    data: {
        ...responseData
    }
})