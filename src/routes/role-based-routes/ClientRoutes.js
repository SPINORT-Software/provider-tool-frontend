import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const PersonalInformation = Loadable(lazy(() => import('views/roles/client/personal-information')));

// ===========================|| MAIN ROUTING ||=========================== //

const ClientRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/personal-info',
            element: <PersonalInformation />
        }
    ]
};

export default ClientRoutes;
