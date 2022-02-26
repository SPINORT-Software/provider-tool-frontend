import * as actionTypes from 'store/actionTypes';


export const setInternalReferralData = (referralData) => ({
    type: actionTypes.DASHBOARD_SET_INTERNAL_REFERRAL_DATA,
    data: referralData
});

export const setExternalReferralData = (referralData) => ({
    type: actionTypes.DASHBOARD_SET_EXTERNAL_REFERRAL_DATA,
    data: referralData
});

export const setInternalFollowUpData = (followUpData) => ({
    type: actionTypes.DASHBOARD_SET_INTERNAL_FOLLOWUP_DATA,
    data: followUpData
});

export const setExternalFollowUpData = (followUpData) => ({
    type: actionTypes.DASHBOARD_SET_EXTERNAL_FOLLOWUP_DATA,
    data: followUpData
});
