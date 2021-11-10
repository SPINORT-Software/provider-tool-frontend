import React from 'react';

// material-ui
import {Typography} from '@material-ui/core';

// project imports
import NavGroup from './NavGroup';
import caseManagerMenuItems from 'menu-items/case-manager';
import reviewBoardMenuItems from 'menu-items/review-board';
import JWTContext from "contexts/JWTContext";


// ===========================|| SIDEBAR MENU LIST ||=========================== //

const MenuList = () => {
    const userAuthContext = React.useContext(JWTContext)
    const {user} = userAuthContext;
    // eslint-disable-next-line camelcase
    const {user_type: userType} = user;
    let roleMenuItems = caseManagerMenuItems;

    switch (userType) {
        case 'TYPE_REVIEW_BOARD':
            roleMenuItems = reviewBoardMenuItems
            break;
        default:
            roleMenuItems = caseManagerMenuItems
    }

    /**
     *  Get menu items for different roles and load them based on the logged in user TYPE in redux data
     */

    const navItems = roleMenuItems.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item}/>;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return navItems;
};

export default MenuList;
