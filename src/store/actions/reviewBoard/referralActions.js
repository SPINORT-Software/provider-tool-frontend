import * as actionTypes from 'store/actionTypes';

export const listReferralsByReviewBoardID = (responseData) => function (dispatch) {
    dispatch(
        {
            type: actionTypes.REVIEW_BOARD_REFERRAL_LIST_CLIENT_REFERRALS,
            data: {
                ...responseData
            }
        }
    )
}

export const setReferralDetails = (values) => ({
    type: actionTypes.REVIEW_BOARD_REFERRAL_SET_CLIENT_DETAIL,
    data: {
        ...values
    }
});


/**
 * ===========================================
 * Referral Form upload actions
 * Currently consists of 4 types of forms.
 * ===========================================
 */
export const setEmpReferralRequestForm = (documentUUID) => ({
    type: actionTypes.REVIEW_BOARD_REFERRAL_SET_FORM_FILE_EMP_REFERRAL_REQUEST,
    data: documentUUID
});

export const setFamiliarFacesSnatForm = (documentUUID) => ({
    type: actionTypes.REVIEW_BOARD_REFERRAL_SET_FORM_FILE_FAMILIAR_FACES_SNAT,
    data: documentUUID
});

export const setFamiliarFacesSdhForm = (documentUUID) => ({
    type: actionTypes.REVIEW_BOARD_REFERRAL_SET_FORM_FILE_FAMILIAR_FACES_FACES_SDH,
    data: documentUUID
});

export const setCasePresentationForm = (documentUUID) => ({
    type: actionTypes.REVIEW_BOARD_REFERRAL_SET_FORM_FILE_CASE_PRESENTATION,
    data: documentUUID
});



