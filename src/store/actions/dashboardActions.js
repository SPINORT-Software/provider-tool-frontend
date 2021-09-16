import * as actionTypes from '../actionTypes';
import axios from 'axios';
import apiClient from '../api-client';

export const fetchMenuItems = () => ({
    type: actionTypes.ADD_PRODUCTS,
    data: {
        menu: 'Menu items'
    }
});

export const fetchSectionAttributes = () => {
    console.log("OK")

    return {
        type: actionTypes.ADD_PRODUCTS,
        data: {
            menu: 'Menu items'
        }
    }

    // eslint-disable-next-line no-unused-expressions
    // async (dispatch) => {
    //     await apiClient.getAttributeGroupsDataBySection()
    //     dispatch({
    //         type: '',
    //         payload: response.data
    //     })
    // }
}


