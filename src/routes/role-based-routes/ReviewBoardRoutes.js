import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const ReviewBoardReferralList = Loadable(lazy(() => import('views/roles/review-board/referral')));
const ReviewBoardReferralCreate = Loadable(lazy(() => import('views/roles/review-board/referral/add-referral')));

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
            element: <ReviewBoardReferralList />
        },
        {
            path: 'referral/add-referral',
            element: <ReviewBoardReferralCreate />
        },
    ]
};

export default CaseManagerRoutes;
