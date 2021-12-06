import preparedMenuItems from './prepare-menu-items';
import commonMenuItems from '../common/common-menu-items';
import commonMenuItemsTop from '../common/common-menu-items-top';

const menuItems = {
    items: [...commonMenuItemsTop, ...preparedMenuItems, ...commonMenuItems]
};

export default menuItems;


