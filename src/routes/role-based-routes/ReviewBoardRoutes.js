import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const ReviewBoardReferral = Loadable(lazy(() => import('views/roles/review-board/referral')));

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
            path: '/referral',
            element: <ReviewBoardReferral />
        },
    ]
};

export default CaseManagerRoutes;
