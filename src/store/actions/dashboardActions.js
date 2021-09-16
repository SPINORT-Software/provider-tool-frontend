import * as actionTypes from '../actions';

const fetchMenuItems = () => ({
    type: actionTypes.ADD_PRODUCTS,
    data: {
        menu: 'Menu items'
    }
});

export default fetchMenuItems;
