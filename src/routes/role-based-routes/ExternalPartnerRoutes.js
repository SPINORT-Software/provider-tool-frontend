import React, {lazy} from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// =================== Add Components ====================
const ClientInterventionAdd = Loadable(lazy(() => import('views/roles/external-partner/client-interventions/add')));

const ClientInterventionDetail = Loadable(lazy(() => import('views/roles/case-manager/client-interventions/add')));

// =================== List Components ====================
const ClientInterventionList = Loadable(lazy(() => import('views/roles/external-partner/client-interventions/list')));

const CaseManagerRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout/>
        </AuthGuard>
    ),
    children: [
        {
            path: '/intervention/list',
            element: <ClientInterventionList/>
        },
        {
            path: '/intervention/add',
            element: <ClientInterventionAdd/>
        },
        {
            path: '/intervention/:intervention_id',
            element: <ClientInterventionDetail/>
        }
    ]
};

export default CaseManagerRoutes;
