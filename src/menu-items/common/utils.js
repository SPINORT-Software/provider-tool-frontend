import {FormattedMessage} from "react-intl";
import React from 'react';
import {IconBrandChrome} from "@tabler/icons";

const icons = {IconBrandChrome};

export default {
    makeMenuItems(menuItem) {
        const menuItemChildren = menuItem.children.map(menuChildren => ({
            'id': menuChildren.id,
            'title': <FormattedMessage id={menuChildren.title}/>,
            'type': menuChildren.type,
            'url': menuChildren.url,
            'icon': icons.IconBrandChrome,
            'breadcrumbs': menuChildren.breadcrumbs
        }));

        return {
            id: menuItem.id,
            type: menuItem.type,
            title: menuItem.title,
            children: [...menuItemChildren]
        };
    }
}
