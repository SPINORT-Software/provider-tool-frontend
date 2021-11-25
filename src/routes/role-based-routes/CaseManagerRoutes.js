import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const DailyWorkload = Loadable(lazy(() => import('views/roles/case-manager/daily-workload')));
const ClientAssessment = Loadable(lazy(() => import('views/roles/case-manager/client-assessment')));
const ClientIntervention = Loadable(lazy(() => import('views/roles/case-manager/client-interventions')));

// ===========================|| MAIN ROUTING ||=========================== //

const CaseManagerRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/workload',
            element: <DailyWorkload />
        },
        {
            path: '/assessment',
            element: <ClientAssessment />
        },
        {
            path: '/intervention',
            element: <ClientIntervention />
        }
    ]
};

export default CaseManagerRoutes;
