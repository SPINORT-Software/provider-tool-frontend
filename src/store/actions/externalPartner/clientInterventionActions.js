import * as actionTypes from 'store/actionTypes';

export const setInterventionClientDetail = (clientUUID) => ({
    type: actionTypes.EXTERNAL_PARTNER_SET_CLIENT_INTERVENTION_CLIENT_DETAIL,
    data: clientUUID
});

export const setInterventionCaseManagerDetail = (caseManagerUUID) => ({
    type: actionTypes.EXTERNAL_PARTNER_SET_CLIENT_INTERVENTION_EXTERNAL_PARTNER_DETAIL,
    data: caseManagerUUID
});

export const setInterventionDateAdd = (date) => ({
    type: actionTypes.EXTERNAL_PARTNER_SET_CLIENT_INTERVENTION_DATE_ADD,
    data: date
});

export const setInterventionFormDetails = (values) => ({
    type: actionTypes.EXTERNAL_PARTNER_SET_CLIENT_INTERVENTION_DETAILS,
    data: {
        ...values
    }
});

export const setInterventionFormUUID = (formDocumentUUID) => ({
    type: actionTypes.EXTERNAL_PARTNER_SET_CLIENT_INTERVENTION_FORM_UUID,
    data: formDocumentUUID
});


export const listExternalPartnerClientInterventions = (responseData) => ({
    type: actionTypes.EXTERNAL_PARTNER_LIST_CLIENT_INTERVENTION_FOR_EXTERNAL_PARTNER,
    data: {
        ...responseData
    }
})