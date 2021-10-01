import React from 'react';

// third-party
import {FormattedMessage} from 'react-intl';

// assets
import {IconBrandChrome} from '@tabler/icons';

import menuData from './json/menu-items.json';

// constant
const icons = {IconBrandChrome};

const makeMenuItems = menuItem => {
    const menuItemChildren = menuItem.children.map(menuChildren => ({
            "id": menuChildren.id,
            "title": <FormattedMessage id={menuChildren.title} />,
            "type": menuChildren.type,
            "url": menuChildren.url,
            "icon": icons.IconBrandChrome,
            "breadcrumbs": menuChildren.breadcrumbs,
        }))

    return {
        id: menuItem.id,
        type: menuItem.type,
        children: [...menuItemChildren]
    }
}

// export default menuData.roles['case-manager'].map(makeMenuItems);
export default menuData.roles['review-board'].map(makeMenuItems);

