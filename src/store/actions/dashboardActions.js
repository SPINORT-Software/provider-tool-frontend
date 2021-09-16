import * as actionTypes from '../actionTypes';
import apiClient from '../api-client';

export const fetchMenuItems = () => ({
    type: actionTypes.ADD_PRODUCTS,
    data: {
        menu: 'Menu items'
    }
});

export const fetchSectionAttributes = (sectionUuid) => function(dispatch) {
        apiClient.getAttributeGroupsDataBySection(sectionUuid).then(response => {
            // eslint-disable-next-line camelcase
            const {value: {attribute_groups, attribute_set}} = response.data

            dispatch(
                {
                    type: actionTypes.FETCH_SECTION_ATTRIBUTES,
                    data: {
                        sectionUuid,
                        attribute_groups,
                        attribute_set
                    }
                }
            )
        })
    }

export const fetchSectionAttributesByRole = (roleID) => function(dispatch) {
    apiClient.getSectionsAndAttributeGroupsDataByRole(roleID).then(response => {
        // eslint-disable-next-line camelcase
        const {value: {data_type_attributes}} = response.data

        dispatch(
            {
                type: actionTypes.FETCH_ROLE_SECTION_ATTRIBUTES,
                data: {
                    sectionAttributes: data_type_attributes
                }
            }
        )
    })
}








