import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';


// application routing
const AppChat = Loadable(lazy(() => import('views/chat')));
// const AppMail = Loadable(lazy(() => import('views/application/mail')));

const CommonRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/messaging',
            element: <AppChat />
        },
        // {
        //     path: '/app/mail',
        //     element: <AppMail />
        // }
    ]
};

export default CommonRoutes;
