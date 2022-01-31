import * as actionTypes from 'store/actionTypes';
import {CASE_MANAGER_LIST_CLIENT_INTERVENTION_FOR_CASE_MANAGER} from "store/actionTypes";

export const setInterventionClientDetail = (clientUUID) => ({
    type: actionTypes.CASE_MANAGER_SET_CLIENT_INTERVENTION_CLIENT_DETAIL,
    data: clientUUID
});

export const setInterventionCaseManagerDetail = (caseManagerUUID) => ({
    type: actionTypes.CASE_MANAGER_SET_CLIENT_INTERVENTION_CASEMANAGER_DETAIL,
    data: caseManagerUUID
});

export const setInterventionDateAdd = (date) => ({
    type: actionTypes.CASE_MANAGER_SET_CLIENT_INTERVENTION_DATE_ADD,
    data: date
});

export const setInterventionFormDetails = (values) => ({
    type: actionTypes.CASE_MANAGER_SET_CLIENT_INTERVENTION_DETAILS,
    data: {
        ...values
    }
});

export const setInterventionFormUUID = (formDocumentUUID) => ({
    type: actionTypes.CASE_MANAGER_SET_CLIENT_INTERVENTION_FORM_UUID,
    data: formDocumentUUID
});


export const listCaseManagerClientInterventions = (responseData) => ({
    type: actionTypes.CASE_MANAGER_LIST_CLIENT_INTERVENTION_FOR_CASE_MANAGER,
    data: {
        ...responseData
    }
})