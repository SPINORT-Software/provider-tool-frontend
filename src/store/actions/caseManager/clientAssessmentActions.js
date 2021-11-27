import * as actionTypes from 'store/actionTypes';
import {
    CASE_MANAGER_SET_CLIENT_ASSESSMENT_SET_EXISTINGEM_GENERAL_ASSESSMENT_FORM_UUID,
    CASE_MANAGER_SET_CLIENT_ASSESSMENT_SET_EXISTINGEM_PROVIDER_SPECIFIC_FORM_UUID,
    CASE_MANAGER_SET_CLIENT_ASSESSMENT_SET_REASSESSMENT_GENERAL_ASSESSMENT_FORM_UUID,
    CASE_MANAGER_SET_CLIENT_ASSESSMENT_SET_REASSESSMENT_PROVIDER_SPECIFIC_FORM_UUID
} from "store/actionTypes";

export const setAssessmentClientStatus = (clientStatus) => ({
    type: actionTypes.CASE_MANAGER_SET_CLIENT_ASSESSMENT_CLIENT_STATUS,
    data: clientStatus
})


// ########################################################################################
// Conditional display components - actions below:
// Existing EM ; Re assessment ; New EM
// ########################################################################################

/**
 * Set the re assessment form details to reducer
 * @param reAssessmentData
 * @returns {{data, type: string}}
 */
export const setReAssessmentDetails = (reAssessmentData) => ({
    type: actionTypes.CASE_MANAGER_SET_CLIENT_ASSESSMENT_REASSESSMENT_DETAILS,
    data: reAssessmentData
});

/**
 * Set the New Extra Mural Client form details to reducer
 * @param reAssessmentData
 * @returns {{data, type: string}}
 */
export const setNewEMAssessmentDetails = (reAssessmentData) => ({
    type: actionTypes.CASE_MANAGER_SET_CLIENT_ASSESSMENT_NEWEM_ASSESSMENT_DETAILS,
    data: reAssessmentData
});

/**
 * Set the Existing Extra Mural Client Form details to reducer
 * @param reAssessmentData
 * @returns {{data, type: string}}
 */
export const setExistingEMAssessmentDetails = (reAssessmentData) => ({
    type: actionTypes.CASE_MANAGER_SET_CLIENT_ASSESSMENT_EXISTINGEM_ASSESSMENT_DETAILS,
    data: reAssessmentData
});



/**
 * Provider Specific assessment form - set document UUID  - NEW EM Client
 * @param formUUID
 * @returns {{data, type: string}}
 */
export const setNewEMProviderSpecificFormUUID = (formDocumentUUID) => ({
    type: actionTypes.CASE_MANAGER_SET_CLIENT_ASSESSMENT_SET_NEWEM_PROVIDER_SPECIFIC_FORM_UUID,
    data: formDocumentUUID
});

/**
 * General Assessment Form set document UUID - NEW EM Client
 */
export const setNewEMGeneralAssessmentFormUUID = (formDocumentUUID) => ({
    type: actionTypes.CASE_MANAGER_SET_CLIENT_ASSESSMENT_SET_NEWEM_GENERAL_ASSESSMENT_FORM_UUID,
    data: formDocumentUUID
});

/**
 * Provider Specific assessment form - set document UUID  - Existing EM Client
 * @param formUUID
 * @returns {{data, type: string}}
 */
export const setExistingEMProviderSpecificFormUUID = (formDocumentUUID) => ({
    type: actionTypes.CASE_MANAGER_SET_CLIENT_ASSESSMENT_SET_EXISTINGEM_PROVIDER_SPECIFIC_FORM_UUID,
    data: formDocumentUUID
});

/**
 * General Assessment Form set document UUID - Existing EM Client
 */
export const setExistingEMGeneralAssessmentFormUUID = (formDocumentUUID) => ({
    type: actionTypes.CASE_MANAGER_SET_CLIENT_ASSESSMENT_SET_EXISTINGEM_GENERAL_ASSESSMENT_FORM_UUID,
    data: formDocumentUUID
});


/**
 * Provider Specific assessment form - set document UUID  - reassessment
 * @param formUUID
 * @returns {{data, type: string}}
 */
export const setReassessmentEMProviderSpecificFormUUID = (formDocumentUUID) => ({
    type: actionTypes.CASE_MANAGER_SET_CLIENT_ASSESSMENT_SET_REASSESSMENT_PROVIDER_SPECIFIC_FORM_UUID,
    data: formDocumentUUID
});

/**
 * General Assessment Form set document UUID - reassessment
 */
export const setReassessmentEMGeneralAssessmentFormUUID = (formDocumentUUID) => ({
    type: actionTypes.CASE_MANAGER_SET_CLIENT_ASSESSMENT_SET_REASSESSMENT_GENERAL_ASSESSMENT_FORM_UUID,
    data: formDocumentUUID
});

