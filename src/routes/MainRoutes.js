import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import menuData from '../menu-items/json/menu-items.json';
import {FormattedMessage} from "react-intl";

// sample page routing
const ConfigurableComponent = Loadable(lazy(() => import('views/configurable-component')));

/**
 * Fetch list of all menu items from API.
 * API data should contain all sections and their URLs.
 * No URL should be same.
 * Every URL should also contain section ID (User role entity data type ID)
 * Using UserRoleEntityDataType ID - attribute groups can be fetched to be displayed on their pages using ConfigurableComponent
 */

// ===========================|| MAIN ROUTING ||=========================== //
const configurableUrl = []
const makeConfigurableUrl = menuItem => {
    menuItem.children.map(menuChildren =>
        configurableUrl.push({
            path: menuChildren.url,
            element: <ConfigurableComponent uuid={menuChildren.uuid} title={menuChildren.formatted_title} />
        })
    )
}
menuData.roles['case-manager'].map(makeConfigurableUrl);

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: configurableUrl
};

export default MainRoutes;


