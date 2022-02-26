import * as actionTypes from 'store/actionTypes';

export const setInternalReferralShareData = (data) => ({
    type: actionTypes.SHARE_SET_INTERNAL_REFERRAL_DATA,
    data
});

export const setExternalReferralShareData = (data) => ({
    type: actionTypes.SHARE_SET_EXTERNAL_REFERRAL_DATA,
    data
});


export const setRandom = (caseManagerUUID) => ({
    type: actionTypes.EXTERNAL_PARTNER_SET_CLIENT_INTERVENTION_EXTERNAL_PARTNER_DETAIL,
    data: caseManagerUUID
});
