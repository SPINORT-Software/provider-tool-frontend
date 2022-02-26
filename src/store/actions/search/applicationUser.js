import * as actionTypes from 'store/actionTypes';

export const setApplicationUserSearchList = (data) => ({
    type: actionTypes.SET_APPLICATION_USER_SEARCH_LIST,
    data
});

export const setApplicationUserSearchParams = (data) => ({
    type: actionTypes.SET_APPLICATION_USER_SEARCH_PARAMS,
    data
})

export const setRandom = (caseManagerUUID) => ({
    type: actionTypes.EXTERNAL_PARTNER_SET_CLIENT_INTERVENTION_EXTERNAL_PARTNER_DETAIL,
    data: caseManagerUUID
});
