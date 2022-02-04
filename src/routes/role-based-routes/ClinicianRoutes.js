import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// =================== Add Components ====================
const DailyWorkloadAdd = Loadable(lazy(() => import('views/roles/clinician/daily-workload/add')));
const ClientAssessmentAdd = Loadable(lazy(() => import('views/roles/clinician/client-assessment/add')));
const ClientInterventionAdd = Loadable(lazy(() => import('views/roles/case-manager/client-interventions/add')));

// =================== Detail Components ====================
const DailyWorkloadDetail = Loadable(lazy(() => import('views/roles/clinician/daily-workload/detail')));
const ClientAssessmentDetail = Loadable(lazy(() => import('views/roles/case-manager/client-assessment/detail')));


// =================== List Components ====================
const DailyWorkloadList = Loadable(lazy(() => import('views/roles/clinician/daily-workload/list')));
const ClientAssessmentList = Loadable(lazy(() => import('views/roles/case-manager/client-assessment/list')));
const ClientInterventionList = Loadable(lazy(() => import('views/roles/case-manager/client-interventions/list')));


// =================== Edit Components ===============
const DailyWorkloadEdit = Loadable(lazy(() => import('views/roles/clinician/daily-workload/edit')));

const ClinicianRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/workload/add',
            element: <DailyWorkloadAdd />
        },
        {
            path: '/workload/:workload_id',
            element: <DailyWorkloadDetail />
        },
        {
            path: '/workload/list',
            element: <DailyWorkloadList />
        },
        {
            path: '/workload/:workload_id/edit',
            element: <DailyWorkloadEdit />
        },
        {
            path: '/assessment/add',
            element: <ClientAssessmentAdd />
        },
        {
            path: '/assessment/:assessment_id',
            element: <ClientAssessmentDetail />
        },
        {
            path: '/assessment/:assessment_id/edit',
            element: <ClientAssessmentAdd />
        },
        {
            path: '/assessment/list',
            element: <ClientAssessmentList />
        },
        {
            path: '/intervention/list',
            element: <ClientInterventionList />
        },
        {
            path: '/intervention/add',
            element: <ClientInterventionAdd />
        }
    ]
};

export default ClinicianRoutes;
