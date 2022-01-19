import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// =================== Add Components ====================
const DailyWorkloadAdd = Loadable(lazy(() => import('views/roles/community-paramedic/daily-workload/add')));
const ClientAssessmentAdd = Loadable(lazy(() => import('views/roles/community-paramedic/client-assessment/add')));

// =================== Detail Components ====================
const DailyWorkloadDetail = Loadable(lazy(() => import('views/roles/community-paramedic/daily-workload/detail')));
const ClientAssessmentDetail = Loadable(lazy(() => import('views/roles/community-paramedic/client-assessment/detail')));


// =================== List Components ====================
const DailyWorkloadList = Loadable(lazy(() => import('views/roles/community-paramedic/daily-workload/list')));
const ClientAssessmentList = Loadable(lazy(() => import('views/roles/community-paramedic/client-assessment/list')));


// =================== Edit Components ===============
const DailyWorkloadEdit = Loadable(lazy(() => import('views/roles/community-paramedic/daily-workload/edit')));

const CommunityParamedicRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/cp/workload/add',
            element: <DailyWorkloadAdd />
        },
        {
            path: '/cp/workload/:workload_id',
            element: <DailyWorkloadDetail />
        },
        {
            path: '/cp/workload/list',
            element: <DailyWorkloadList />
        },
        {
            path: '/cp/workload/:workload_id/edit',
            element: <DailyWorkloadEdit />
        },
        {
            path: '/cp/assessment/add',
            element: <ClientAssessmentAdd />
        },
        {
            path: '/cp/assessment/list',
            element: <ClientAssessmentList />
        },
        {
            path: '/cp/assessment/:assessment_id',
            element: <ClientAssessmentDetail />
        },
        {
            path: '/cp/assessment/:assessment_id/edit',
            element: <ClientAssessmentAdd />
        }
    ]
};

export default CommunityParamedicRoutes;
