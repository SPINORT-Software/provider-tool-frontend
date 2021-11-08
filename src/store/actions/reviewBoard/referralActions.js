import * as actionTypes from 'store/actionTypes';
import apiClient from 'store/api-client';

export const setClientDetail = (values) => ({
        type: actionTypes.REVIEW_BOARD_REFERRAL_SET_CLIENT_DETAIL,
        data: {
            ...values
        }
    })

export const setClientDecision = (decisionValue, decisionReason) => ({
    type: actionTypes.REVIEW_BOARD_REFERRAL_SET_CLIENT_DECISION,
    data: {
        decision: decisionValue,
        decisionReason
    }
})

export const setReferralDetail = (values) => ({
    type: actionTypes.REVIEW_BOARD_REFERRAL_SET_REFERRAL_DETAIL,
    data: {
        ...values
    }
})

