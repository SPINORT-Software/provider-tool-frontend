import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const PersonalInformation = Loadable(lazy(() => import('views/roles/client/personal-information')));
const ClinicalInformation = Loadable(lazy(() => import('views/roles/client/clinical-information')));
const VisitorLog = Loadable(lazy(() => import('views/roles/client/visitors-log')));
const CommunicationLog = Loadable(lazy(() => import('views/roles/client/communication-log')));

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
        },
        {
            path: '/clinical-info',
            element: <ClinicalInformation />
        },
        {
            path: '/visitorlog',
            element: <VisitorLog />
        },
        {
            path: '/communicationlog',
            element: <CommunicationLog />
        }
    ]
};

export default ClientRoutes;
