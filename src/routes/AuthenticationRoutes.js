import React, { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

// project imports
import MinimalLayout from 'layout/MinimalLayout';

// login option 2 routing
const AuthLogin2 = Loadable(lazy(() => import('views/authentication/authentication2/Login2')));
const AuthRegister2 = Loadable(lazy(() => import('views/authentication/authentication2/Register2')));
const AuthForgotPassword2 = Loadable(lazy(() => import('views/authentication/authentication2/ForgotPassword2')));
const AuthCheckMail2 = Loadable(lazy(() => import('views/authentication/authentication2/CheckMail2')));
const AuthResetPassword2 = Loadable(lazy(() => import('views/authentication/authentication2/ResetPassword2')));
const AuthCodeVerification2 = Loadable(lazy(() => import('views/authentication/authentication2/CodeVerification2')));

// // login option 3 routing
// const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
// const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
// const AuthForgotPassword3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/ForgotPassword3')));
// const AuthCheckMail3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/CheckMail3')));
// const AuthResetPassword3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/ResetPassword3')));
// const AuthCodeVerification3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/CodeVerification3')));
//
// // maintenance routing
// const MaintenanceError = Loadable(lazy(() => import('views/pages/maintenance/Error')));
// const MaintenanceComingSoon1 = Loadable(lazy(() => import('views/pages/maintenance/ComingSoon/ComingSoon1')));
// const MaintenanceComingSoon2 = Loadable(lazy(() => import('views/pages/maintenance/ComingSoon/ComingSoon2')));
// const MaintenanceUnderConstruction = Loadable(lazy(() => import('views/pages/maintenance/UnderConstruction')));
//
// // landing & contact-us routing
// const PagesLanding = Loadable(lazy(() => import('views/pages/landing')));
// const PagesContactUS = Loadable(lazy(() => import('views/pages/contact-us')));

// ===========================|| AUTHENTICATION ROUTING ||=========================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/pages/login/login2',
            element: <AuthLogin2 />
        },
        {
            path: '/pages/register/register2',
            element: <AuthRegister2 />
        },
        {
            path: '/pages/forgot-password/forgot-password2',
            element: <AuthForgotPassword2 />
        },
        {
            path: '/pages/check-mail/check-mail2',
            element: <AuthCheckMail2 />
        },
        {
            path: '/pages/reset-password/reset-password2',
            element: <AuthResetPassword2 />
        },
        {
            path: '/pages/code-verification/code-verification2',
            element: <AuthCodeVerification2 />
        },
    ]
};

export default AuthenticationRoutes;
