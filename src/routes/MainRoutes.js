import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import menuData from '../menu-items/json/menu-items.json';

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

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/client-assessment',
            element: <ConfigurableComponent title="Assessment" />
        },
        {
            path: '/daily-workload',
            element: <ConfigurableComponent title="Daily Workload"/>
        },
        {
            path: '/client-intervention',
            element: <ConfigurableComponent title="Intervention"/>
        }
    ]
};

export default MainRoutes;


