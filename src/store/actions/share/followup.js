import * as actionTypes from 'store/actionTypes';

export const setInternalFollowUpShareData = (data) => ({
    type: actionTypes.SHARE_SET_INTERNAL_FOLLOWUP_DATA,
    data
});

export const setExternalFollowUpShareData = (data) => ({
    type: actionTypes.SHARE_SET_EXTERNAL_FOLLOWUP_DATA,
    data
});
