import preparedMenuItems from './prepare-menu-items';
import commonMenuItems from '../common/common-menu-items';

const menuItems = {
    items: [...preparedMenuItems, ...commonMenuItems]
};

export default menuItems;
