import React, {lazy} from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';


// application routing
const Dashboard = Loadable(lazy(() => import('views/dashboard')));

const HomeRoute = {
    path: '',
    element: (
        <AuthGuard>
            <MainLayout/>
        </AuthGuard>
    ),
    children: [
        {
            path: '/',
            element: <Dashboard/>
        },
    ]
};

export default HomeRoute;
