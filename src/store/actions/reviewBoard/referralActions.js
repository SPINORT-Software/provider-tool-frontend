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
})


// Standardize organizations
// const organizationValues = values.organizations_upon_referral.map(organization => organization.label)
// values.organizations_upon_referral = organizationValues
//
// // Standardize organizations
// const membersValues = values.members_present_case_discussion.map(members => members.label)
// values.members_present_case_discussion = membersValues